require 'rails_helper'

RSpec.describe "Fields", type: :request do
  before do
    @field = FactoryBot.create(:field)
    @auth_tokens = auth_sign_in(@field.user)
    @params = {
      field_name: @field.field_name,
      product: @field.product,
      area: @field.area,
      start_date: @field.start_date,
      info: @field.info
    }
  end

  describe "POST /fields" do
    it "works! (now write some real specs)" do
      post api_v1_fields_path, params: @params, headers: @auth_tokens

      expect(response).to have_http_status :ok
    end
  end
end
