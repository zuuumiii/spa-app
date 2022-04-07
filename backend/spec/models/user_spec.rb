require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = FactoryBot.build(:user)
  end


  describe "ユーザー新規登録" do
    context "正常系：登録できる" do
      it "全ての入力が正しい" do
        expect(@user).to be_valid
      end
    end

    context "異常系：登録できない" do
      it "nameが空では登録できない" do
        @user.name = ""
        @user.valid?
        expect(@user.errors.full_messages).to include "Name can't be blank"
      end
      it "Emailが空では登録できない" do
        @user.email = ""
        @user.valid?
        expect(@user.errors.full_messages).to include "Email can't be blank"
      end
      it "passwordが空では登録できない" do
        @user.password = ""
        @user.valid?
        expect(@user.errors.full_messages).to include "Password can't be blank"
      end
      it "prec_noが空では登録できない" do
        @user.prec_no = nil
        @user.valid?
        expect(@user.errors.full_messages).to include "Prec no can't be blank"
      end
      it "block_noが空では登録できない" do
        @user.block_no = nil
        @user.valid?
        expect(@user.errors.full_messages).to include "Block no can't be blank"
      end
      it "既に登録されているEmailでは登録できない" do
        @user.save
        user2 = FactoryBot.build(:user)
        user2.email = @user.email
        user2.valid?
        expect(user2.errors.full_messages).to include "Email has already been taken"
      end
    end
  end
end
