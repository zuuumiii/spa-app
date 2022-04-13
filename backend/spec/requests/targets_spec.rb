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


end
