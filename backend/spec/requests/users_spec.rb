require 'rails_helper'

RSpec.describe "SignUp", type: :request do
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
      it "正しく登録できる" do
        expect{post api_v1_user_registration_path, params: @params}.to change{User.count}.by(1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["data"]["name"]).to eq(@user.name)
        expect(response).to have_http_status :ok
      end
    end

    context "誤って入力されているとき" do
      it "正しく登録できずエラーが含まれている" do
        @params["name"] = "#{"a" * 19}"
        expect{post api_v1_user_registration_path, params: @params}.to change{User.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response).to have_http_status 422
      end
    end
  end
end

RSpec.describe "User", type: :request do
  before do
    @user = FactoryBot.create(:user)
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
  describe "ユーザー削除" do
    context "正しく削除できるとき" do
      it "正しく削除できる" do
        expect{delete api_v1_user_registration_path(@user), headers: @auth_tokens}.to change{User.count}.by(-1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["message"]).to include("アカウントは削除されました")
        expect(response).to have_http_status :ok
      end
    end
    context "削除できないとき" do
      it "認証されていないユーザーから削除できない" do
        expect{delete api_v1_user_registration_path(@user)}.to change{User.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]).to include("削除するアカウントが見つかりません。")
        expect(response).to have_http_status 404
      end
    end
  end

  describe "ユーザー編集" do
    context "正しい編集できるとき" do
      it "正しく入力で編集できるとき" do
        @params["name"] = "aaaa"
        expect{put api_v1_user_registration_path(@user), params: @params, headers: @auth_tokens}.to change{User.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["data"]["name"]).to eq("aaaa")
        expect(response).to have_http_status :ok
      end
    end
    context "編集できないとき" do
      it "間違った入力で編集できない" do
        @params["name"] = "#{"a" * 19}"
        expect{put api_v1_user_registration_path(@user), params: @params, headers: @auth_tokens}.to change{User.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("名前は18文字以内で入力してください")
        expect(response).to have_http_status 422
      end
      it "認証されてないユーザーから編集できない" do
        @params["name"] = "aaaa"
        expect{put api_v1_user_registration_path(@user), params: @params}.to change{User.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]).to include("ユーザーが見つかりません。")
        expect(response).to have_http_status 404
      end
    end
  end
end
