class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?

  before_action :fake_load

def fake_load
  sleep(0)
end
end
