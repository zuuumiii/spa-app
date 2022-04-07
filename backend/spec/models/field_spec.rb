require 'rails_helper'

RSpec.describe Field, type: :model do 
  before do
    @field = FactoryBot.build(:field)
  end

  describe "圃場新規登録" do
    context "正常系：登録できる" do
      it "全ての入力が正しい" do
        expect(@field).to be_valid
      end
      it "areaが空でも登録できる" do
        @field.area = nil.to_i
        expect(@field).to be_valid
      end
      it "infoが空でも登録できる" do
        @field.info = ""
        expect(@field).to be_valid
      end
    end

    context "異常系：登録できない" do
      it "field_nameが空では登録できない" do
        @field.field_name = ""
        @field.valid?
        expect(@field.errors.full_messages).to include "圃場名を入力してください"
      end
      it "productが空では登録できない" do
        @field.product = ""
        @field.valid?
        expect(@field.errors.full_messages).to include "作物名を入力してください"
      end
      it "star_dateが空では登録できない" do
        @field.start_date = nil
        @field.valid?
        expect(@field.errors.full_messages).to include "開始日を入力してください"
      end
      it "correctが空では登録できない" do
        @field.correct = nil
        @field.valid?
        expect(@field.errors.full_messages).to include "補正温度を入力してください"
      end
      it "user無しでは登録できない" do
        @field.user = nil
        @field.valid?
        expect(@field.errors.full_messages).to include "ユーザーを入力してください"
      end
      it "field_nameが19文字以上では登録できない" do
        @field.field_name = "#{"a" * 19}"
        @field.valid?
        expect(@field.errors.full_messages).to include "圃場名は18文字以内で入力してください"
      end
      it "productが19文字以上では登録できない" do
        @field.product = "#{"a" * 19}"
        @field.valid?
        expect(@field.errors.full_messages).to include "作物名は18文字以内で入力してください"
      end
      it "infoが100文字以上では登録できない" do
        @field.info = "#{"a" * 101}"
        @field.valid?
        expect(@field.errors.full_messages).to include "圃場情報は100文字以内で入力してください"
      end
      it "areaが10000以上では登録できない" do
        @field.area = 10000
        @field.valid?
        expect(@field.errors.full_messages).to include "面積は10000より小さい値にしてください"
      end
    end
  end
end
