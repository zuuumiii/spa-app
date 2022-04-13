require 'rails_helper'

RSpec.describe "Create", type: :request do
  before do
    @target = FactoryBot.create(:target)
    @auth_tokens = auth_sign_in(@target.user)
    @params = {
      target_name: @target.target_name,
      target_temp: @target.target_temp,
      memo: @target.memo
    }
  end

  describe "目標新規投稿" do
    context "正しく入力されているとき" do
      it "正しく投稿できる" do
        expect{post api_v1_field_targets_path(@target.field), params: @params, headers: @auth_tokens}.to change{Target.count}.by(1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]["target_name"]).to eq(Target.last.target_name)
        expect(response).to have_http_status :ok
      end
    end

    context "誤って入力されているとき" do
      it "正しく投稿できずエラーが含まれている" do
        @params["target_temp"] = 999999
        expect{post api_v1_field_targets_path(@target.field), params: @params, headers: @auth_tokens}.to change{Target.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to include("目標温度は10000より小さい値にしてください")
        expect(res["data"]).not_to include(@target.target_temp)
        expect(response).to have_http_status :ok
      end
    end
  end

  describe "目標削除" do
    context "正しく削除できるとき" do
      it "正しく削除できたらメッセージが含まれる" do
        expect{delete api_v1_field_target_path(@target.field_id, @target.id), headers: @auth_tokens}.to change{Target.count}.by(-1)
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
        expect{delete api_v1_field_target_path(@target.field_id, @target.id), headers: another_tokens}.to change{Target.count}.by(0)
        expect(Target.last.target_name).to eq(@target.target_name)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to eq("不正な操作です")
        expect(response).to have_http_status :ok
      end
      it "認証されていないユーザーから削除できない" do
        expect{delete api_v1_field_target_path(@target.field_id, @target.id), headers: nil}.to change{Target.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["errors"]).to include("ログインもしくはアカウント登録してください。")
        expect(response).to have_http_status 401
      end
    end
  end

  describe "目標編集" do
    context "正しく編集できるとき" do
      it "正しく入力で編集できるとき" do
        @params["target_temp"] = 1200
        expect{put api_v1_field_target_path(@target.field_id, @target.id), params: @params, headers: @auth_tokens}.to change{Target.count}.by(0)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]["target_temp"]).to eq(Target.last.target_temp)
        expect(response).to have_http_status :ok
      end
    end
    context "編集できないとき" do
      it "別のユーザから編集しようとすると、エラーが出て編集されない" do
        another_user = FactoryBot.create(:user)
        another_tokens = auth_sign_in(another_user)
        @params["target_temp"] = 1200
        expect{put api_v1_field_target_path(@target.field_id, @target.id), params: @params, headers: another_tokens}.to change{Target.count}.by(0)
        expect(Target.last.target_temp).to eq(@target.target_temp)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to eq("不正な操作です")
        expect(response).to have_http_status :ok
      end
      it "間違った入力で編集できない" do
        @params["target_temp"] = 10000
        expect{put api_v1_field_target_path(@target.field_id, @target.id), params: @params, headers: @auth_tokens}.to change{Target.count}.by(0)
        expect(Target.last.target_temp).to eq(@target.target_temp)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("ERROR")
        expect(res["data"]).to include("目標温度は10000より小さい値にしてください")
        expect(response).to have_http_status :ok
      end
      it "認証されてないユーザーから編集できない" do
        @params["target_temp"] = 1200
        expect{put api_v1_field_target_path(@target.field_id, @target.id), params: @params, headers: nil}.to change{Target.count}.by(0)
        expect(Target.last.target_temp).to eq(@target.target_temp)
        res = JSON.parse(response.body)
        expect(res["errors"]).to include("ログインもしくはアカウント登録してください。")
        expect(response).to have_http_status 401
      end
    end
  end

  describe "ユーザー削除されたら目標も消える" do
    context "ユーザー削除されたら目標も消える" do
      it "ユーザー削除されたら目標も消える" do
        expect{delete api_v1_user_registration_path(@target.user), headers: @auth_tokens}.to change{User.count}.by(-1).and change{Target.count}.by(-1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(response).to have_http_status :ok
      end
    end
  end
end
