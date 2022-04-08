require 'rails_helper'

RSpec.describe Target, type: :model do
  before do  
    @target = FactoryBot.build(:target)
    
  end

  describe "圃場目標登録" do
    context "正常系：登録できる" do
      it "全ての入力が正しい" do
        expect(@target).to be_valid
      end
      it "memoが空でも登録できる" do
        @target.memo = ""
        expect(@target).to be_valid
      end
    end

    context "異常系：登録できない" do
      it "target_nameが空では登録できない" do
        @target.target_name = ""
        @target.valid?
        expect(@target.errors.full_messages).to include "目標名を入力してください"
      end
      it "target_tempが空では登録できない" do
        @target.target_temp = nil
        @target.valid?
        expect(@target.errors.full_messages).to include "目標温度を入力してください"
      end
      it "target_tempは数値以外では登録できない" do
        @target.target_temp = "aaa"
        @target.valid?
        expect(@target.errors.full_messages).to include "目標温度は数値で入力してください"
      end
      it "target_tempは10000以上では登録できない" do
        @target.target_temp = 10000
        @target.valid?
        expect(@target.errors.full_messages).to include "目標温度は10000より小さい値にしてください"
      end
      it "target_nameは19文字以上では登録できない" do
        @target.target_name = "#{"a" * 19}"
        @target.valid?
        expect(@target.errors.full_messages).to include "目標名は18文字以内で入力してください"
      end
      it "memoは101文字以上では登録できない" do
        @target.memo = "#{"a" * 101}"
        @target.valid?
        expect(@target.errors.full_messages).to include "メモは100文字以内で入力してください"
      end
      it "1圃場につきtargetは20個までしか登録できない" do
        @target.save
        19.times do |i|
           FactoryBot.create(:target, field_id: @target.field_id)
        end
        @target21 = FactoryBot.build(:target, field_id: @target.field_id)
        @target21.valid?
        expect(@target21.errors.full_messages).to include "目標は圃場につき20個までの登録です"
      end
    end
  end
end
