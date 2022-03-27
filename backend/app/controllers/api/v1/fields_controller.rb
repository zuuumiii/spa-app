module Api
  module V1
    require 'mechanize'
    require "date"
    class FieldsController < ApplicationController
    
      def index
        fields = Field.where(user_id: current_api_v1_user.id)
        user = User.find(current_api_v1_user.id)
        fields = fields.each do |field|  #update_atと今日の日付を比較させて、一致すれば処理を停止（１日１回までの更新に制限させるため）
          result = get_accum(field.start_date, user.prec_no, user.block_no, field.correct)
          field[:accum_temp] = result
          field.save
        end

        render json: { status: "SUCCESS", data: fields }
      end

      def create 
       field = Field.new(field_params)
       if field.save
        render json: { status: "SUCCESS", data: field }
       else
        render json: { status: "ERROR", data: field.errors }
       end
      end
    
    private
      def field_params
        params.permit(:field_name, :product, :info, :area, :start_date, :correct).merge(user_id: current_api_v1_user.id)
      end
    
    
      def get_accum(date, prec_no, block_no, correct)        
        y_date = Date.yesterday
        y_year = y_date.year
        y_month = y_date.month
        y_day = y_date.day
    
        start_date = Time.at(date) #UNIX時間から変換
        start_year = start_date.year
        start_month = start_date.month
        start_day = start_date.day
        
        diff_month = y_month - start_month
        if y_year == start_year       #同じ年でなければ差に＋13
          term_month = diff_month + 1
        else
          term_month = diff_month + 13
        end
        
        ave_temps =[] #空の配列を作成して取得データを追加
        term_month.times do |m|
    
          if start_month + m > 12
            start_year += 1
            start_month -= 12
          end
    
          url = "http://www.data.jma.go.jp/obd/stats/etrn/view/daily_s1.php?prec_no=#{prec_no}&block_no=#{block_no}&year=#{start_year}&month=#{start_month + m}&day=1&view=" #daily_s1をa1に変えれば各地方局にも対応可能
          agent = Mechanize.new
          page = agent.get(url)
          
          td_length = page.search("//*[@id='tablefix1']/tr").length-4 #td要素の上４つは項目なので、全td要素から4を引いた数がデータの数になる
          
          if m == 0 #スタート月のデータ取得
            (td_length-(start_day-1)).times do |i|
              ave_temp = page.search("//*[@id='tablefix1']/tr[#{5+(start_day-1)+i}]").search('td')[6].inner_text #７番目のtdタグが日平均気温
              ave_temps << ave_temp.delete("^0-9.-") #配列としてave_tempsに順に追加
            end
          elsif m == term_month - 1 #今月のデータ取得
            y_day.times do |i|
              ave_temp = page.search("//*[@id='tablefix1']/tr[#{5+i}]").search('td')[6].inner_text 
              ave_temps << ave_temp.delete("^0-9.-") 
            end
          else     #中間の月は全部取得
            td_length.times do |i|
              ave_temp = page.search("//*[@id='tablefix1']/tr[#{5+i}]").search('td')[6].inner_text 
              ave_temps << ave_temp.delete("^0-9.-") 
            end
          end
        end
    
        total_temp = 0
        ave_temps.each do |temp|
          if temp.present?              #配列に値があるときのみ計算
            temp = temp.to_f + correct  #ここで補正値計算 
            if temp <= 0                #0度以下はデータとして加算しない。
              temp = 0
            end
            total_temp += temp
          end
        end
        return total_temp.round(2)
      end
    end
  end
end