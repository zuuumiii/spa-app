require 'rails_helper'

RSpec.describe "Create", type: :request do
  before do
    @user = FactoryBot.create(:user)
    @auth_tokens = auth_sign_in(@user)
    @params = {
      name: @user.name,
      email: @user.email,
      password: @user.password
      password_confirmation: @user.password_confirmation
      prec_no: @user.prec_no
      block_no: @user.block_no
    }
  end
end
