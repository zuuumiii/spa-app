require 'rails_helper'

RSpec.describe "Create", type: :request do
  before do
    @target = FactoryBot.create(:target)
    @auth_tokens = auth_sign_in(@target.field.user)
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

end
