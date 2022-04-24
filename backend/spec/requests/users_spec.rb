require 'rails_helper'

RSpec.describe "Create", type: :request do
  before do
    @user = FactoryBot.build(:user)
    @auth_tokens = auth_sign_in(@user)
    @params = {
      name: @user.name,
      email: @user.email,
      password: @user.password,
      password_confirmation: @user.password_confirmation,
      prec_no: @user.prec_no,
      block_no: @user.block_no,
    }
  end

  describe "ユーザー新規登録" do
    context "正しく入力されているとき" do
      it "正しく投稿できる" do
        expect{post api_v1_user_registration_path, params: @params}.to change{User.count}.by(1)
      end
    end

    context "誤って入力されているとき" do
      it "正しく登録できずエラーが含まれている" do
        
      end
    end
  end

  describe "ユーザー削除" do
    context "正しく削除できるとき" do
      it "正しく削除できる" do
        
      end
    end
    context "削除できないとき" do
      it "別のユーザから削除しようとすると、エラーが出て削除されない" do
 
      end
      it "認証されていないユーザーから削除できない" do

      end
    end
  end

  describe "ユーザー編集" do
    context "正しく編集できるとき" do
      it "正しく入力で編集できるとき" do
    
      end
    end
    context "編集できないとき" do
      it "別のユーザから編集しようとすると、エラーが出て編集されない" do

      end
      it "間違った入力で編集できない" do

      end
      it "認証されてないユーザーから編集できない" do

      end
    end
  end
end
