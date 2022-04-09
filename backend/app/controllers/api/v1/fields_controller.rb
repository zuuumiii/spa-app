module Api
  module V1
    class FieldsController < ApplicationController

      def index
        fields = Field.each_get_accum(current_api_v1_user)
        string = fields.map.as_json(include: :targets)
        render json: { status: "SUCCESS", data: string }
      end

      def show
        field = Field.find(params[:id])
        if field.user_id == current_api_v1_user.id
          string = field.as_json(include: :targets)
          render json: { status: "SUCCESS", data: string }
        else
          render json: { status: "ERROR", data: "不正な操作です" }
        end
      end

      def create 
       field = Field.new(field_params)
       field = Field.update_accum(current_api_v1_user, field)
       if field.save
        render json: { status: "SUCCESS", data: field }
       else
        render json: { status: "ERROR", data: field.errors.full_messages }
       end
      end

      def update 
        field = Field.find(params[:id])
        if field.user_id == current_api_v1_user.id
          field.update(field_params)
          field = Field.update_accum(current_api_v1_user, field)
          if field.save
           render json: { status: "SUCCESS", data: field }
          else
           render json: { status: "ERROR", data: field.errors.full_messages }
          end
        else
          render json: { status: "ERROR", data: "不正な操作です" }
        end
      end

      def destroy
        field = Field.find(params[:id])
        if field.user_id == current_api_v1_user.id
          if field.destroy
            render json: { status: "SUCCESS" , data: "削除しました"}
          else
            render json: { status: "ERROR", data: field.errors }
          end
        else
          render json: { status: "ERROR", data: "不正な操作です" }
        end
      end
    
    private
      def field_params
        params.permit(:field_name, :product, :info, :area, :start_date, :correct).merge(user_id: current_api_v1_user.id)
      end
      
      def set_field
        field = Field.find(params[:id])
      end
    end
  end
end
