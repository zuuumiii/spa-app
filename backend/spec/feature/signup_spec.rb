require "rails_helper"

RSpec.describe 'ユーザー新規登録', type: :system, js: true do
  before do
    @user = FactoryBot.build(:user)
  end

  context 'ユーザー新規登録ができるとき' do 
    it '正しい情報を入力すればユーザー新規登録ができてトップページに移動する' do
      visit "/"
      find("#signup").click          # 新規登録ページへ移動する
      fill_in "name", with: @user.name    # ユーザー情報を入力する
      fill_in "email", with: @user.email
      fill_in "password", with: @user.password
      fill_in "password-confirmation", with: @user.password_confirmation
      click_button("登録")
      sleep(2)
      visit "/"
      expect(page).to have_content @user.name
      expect(page).to have_no_content("ログイン")
      expect(page).to have_no_content("新規登録")
    end
  end
  context 'ユーザー新規登録ができないとき' do
    it '誤った情報ではユーザー新規登録ができずに新規登録ページへ戻ってくる' do
      visit "/"
      find("#signup").click          # 新規登録ページへ移動する
      fill_in "name", with: @user.name    # ユーザー情報を入力する
      fill_in "email", with: @user.email
      fill_in "password", with: @user.password
      fill_in "password-confirmation", with: "aaa"
      click_button("登録")
      sleep(2)
      expect(current_path).to eq "/signup"
      expect(page).to have_content "各項目を正しく入力してください。"
    end
  end
end
