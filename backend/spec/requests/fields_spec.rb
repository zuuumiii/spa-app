require 'rails_helper'

RSpec.describe "Create", type: :request do
  before do
    @field = FactoryBot.create(:field)
    @auth_tokens = auth_sign_in(@field.user)
    @params = {
      field_name: @field.field_name,
      product: @field.product,
      area: @field.area,
      start_date: @field.start_date,
      correct: @field.correct,
      info: @field.info
    }
  end

  describe "圃場新規投稿" do
    context "正しく入力されているとき" do
      it "正しく投稿できる" do
        expect{post api_v1_fields_path, params: @params, headers: @auth_tokens}.to change{Field.count}.by(1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]["field_name"]).to eq(Field.last.field_name)
        expect(response).to have_http_status :ok
      end
    end

    context "誤って入力されているとき" do
      it "正しく投稿できずエラーが含まれている" do
        @params["area"] = 999999
        expect{post api_v1_fields_path, params: @params, headers: @auth_tokens}.to change{Field.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to include("面積は10000より小さい値にしてください")
        expect(res["data"]).not_to include(@field.field_name)
        expect(response).to have_http_status :ok
      end
    end
  end

  describe "圃場削除" do
    context "正しく削除できるとき" do
      it "正しく削除できたらメッセージが含まれる" do
        expect{delete api_v1_field_path(@field), headers: @auth_tokens}.to change{Field.count}.by(-1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]).to eq("削除しました")
        expect(response).to have_http_status :ok
      end
    end
    context "削除できないとき" do
      it "別のユーザから削除しようとすると、エラーが出て削除されない" do
        another_user = FactoryBot.create(:user)
        another_tokens = auth_sign_in(another_user)
        expect{delete api_v1_field_path(@field), headers: another_tokens}.to change{Field.count}.by(0)
        expect(Field.last.field_name).to eq(@field.field_name)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to eq("不正な操作です")
        expect(response).to have_http_status :ok
      end
      it "認証されていないユーザーから削除できない" do
        expect{delete api_v1_field_path(@field), headers: nil}.to change{Field.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["errors"]).to include("ログインもしくはアカウント登録してください。")
        expect(response).to have_http_status 401
      end
    end
  end

  describe "圃場編集" do
    context "正しく編集できるとき" do
      it "正しく入力で編集できるとき" do
        @params["product"] = "ながいも"
        expect{put api_v1_field_path(@field), params: @params, headers: @auth_tokens}.to change{Field.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]["product"]).to eq(Field.last.product)
        expect(response).to have_http_status :ok
      end
    end
    context "編集できないとき" do
      it "別のユーザから編集しようとすると、エラーが出て編集されない" do
        another_user = FactoryBot.create(:user)
        another_tokens = auth_sign_in(another_user)
        @params["product"] = "ながいも"
        expect{put api_v1_field_path(@field), params: @params, headers: another_tokens}.to change{Field.count}.by(0)
        expect(Field.last.product).to eq(@field.product)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to eq("不正な操作です")
        expect(response).to have_http_status :ok
      end
      it "間違った入力で編集できない" do
        @params["product"] = "#{"a" * 19}"
        expect{put api_v1_field_path(@field), params: @params, headers: @auth_tokens}.to change{Field.count}.by(0)
        expect(Field.last.product).to eq(@field.product)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to include("作物名は18文字以内で入力してください")
        expect(response).to have_http_status :ok
      end
      it "認証されてないユーザーから編集できない" do
        @params["product"] = "ながいも"
        expect{put api_v1_field_path(@field), params: @params, headers: nil}.to change{Field.count}.by(0)
        expect(Field.last.product).to eq(@field.product)
        res = JSON.parse(response.body)
        expect(res["errors"]).to include("ログインもしくはアカウント登録してください。")
        expect(response).to have_http_status 401
      end
    end
  end

  describe "ユーザー削除されたら圃場も消える" do
    context "ユーザー削除されたら圃場も消える" do
      it "ユーザー削除されたら圃場も消える" do
        expect{delete api_v1_user_registration_path(@field.user), params: @params, headers: @auth_tokens}.to change{User.count}.by(-1).and change{Field.count}.by(-1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(response).to have_http_status :ok
      end
    end
  end
end

