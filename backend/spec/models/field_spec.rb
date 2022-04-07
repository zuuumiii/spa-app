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
        @field.area = nil
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
        expect(@field.errors.full_messages).to include "Field name can't be blank"
      end
      it "productが空では登録できない" do
        @field.product = ""
        @field.valid?
        expect(@field.errors.full_messages).to include "Product can't be blank"
      end
      it "star_dateが空では登録できない" do
        @field.start_date = nil
        @field.valid?
        expect(@field.errors.full_messages).to include "Start date can't be blank"
      end
      it "correctが空では登録できない" do
        @field.correct = nil
        @field.valid?
        expect(@field.errors.full_messages).to include "Correct can't be blank"
      end
      it "user無しでは登録できない" do
        @field.user = nil
        @field.valid?
        expect(@field.errors.full_messages).to include "User must exist"
      end
    end
  end
end
