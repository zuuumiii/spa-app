require "rails_helper"

RSpec.describe 'ユーザー削除', type: :system, js: true do
  before do
    @user = FactoryBot.build(:user)
  end

  context 'ユーザー削除できるとき' do 
    it 'ユーザー削除後、削除したユーザーではログインできない' do
      sign_in(@user)
      find("#user").click
      expect(current_path).to eq "/user"
      click_button("アカウント削除")
      click_button("OK")
      sleep(2)
      expect(current_path).to eq "/signin"
      fill_in "email", with: @user.email
      fill_in "password", with: @user.password
      click_button("ログイン")
      expect(page).to have_content "メールアドレス、パスワードが間違っています。"
    end
  end
  context 'ユーザー削除キャンセルしたとき' do 
    it 'ユーザー削除キャンセル後、ユーザー編集ページへ残る' do
      sign_in(@user)
      find("#user").click
      expect(current_path).to eq "/user"
      click_button("アカウント削除")
      click_button("キャンセル")
      expect(current_path).to eq "/user"
      expect(page).to have_content @user.name

    end
  end
end


RSpec.describe 'ユーザー情報更新', type: :system, js: true do
  before do
    @user = FactoryBot.build(:user)
  end
  
  context 'ユーザー情報更新ができるとき' do 
    it '正しい情報で更新できる' do
      sign_in(@user)
      find("#user").click
      expect(current_path).to eq "/user"
      fill_in "name", with: "三島由紀夫"
      click_button("登録")
      sleep(2)
      expect(current_path).to eq "/"
      expect(page).to have_content "三島由紀夫"
    end
  end
  context 'ユーザー情報更新ができないとき' do
    it '更新できずにエラーが出る' do
      sign_in(@user)
      find("#user").click
      expect(current_path).to eq "/user"
      fill_in "name", with: "#{"a" * 19}"
      click_button("登録")
      sleep(2)
      expect(current_path).to eq "/user"
      expect(page).to have_content "各項目を正しく入力してください"
    end
  end
end


RSpec.describe 'ユーザー新規登録', type: :system, js: true do
  before do
    @user = FactoryBot.build(:user)
  end
  
  context 'ユーザー新規登録ができるとき' do 
    it '正しい情報で新規登録できる' do
      sign_in(@user)
    end
  end
  context 'ユーザー新規登録ができないとき' do
    it '新規登録ができずに新規登録ページへ戻ってくる' do
      visit "/"
      find("#signup").click
      fill_in "name", with: @user.name
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

RSpec.describe 'ユーザーログイン、ログアウト', type: :system, js: true do
  before do
    @user = FactoryBot.build(:user)
  end

  context 'ユーザーログインができるとき' do 
    it '正しい情報で新規登録→ログアウト→ログインできる' do
      sign_in(@user)
      click_button("ログアウト")
      sleep(2)
      expect(current_path).to eq "/signin"
      fill_in "email", with: @user.email
      fill_in "password", with: @user.password
      click_button("ログイン")
      expect(page).to have_content @user.name
      expect(page).to have_no_content("ログイン")
      expect(page).to have_no_content("新規登録")
    end
  end
  context 'ユーザーログインができないとき' do
    it 'ログアウト→ログイン情報が違うためログインできない' do
      sign_in(@user)
      click_button("ログアウト")
      sleep(2)
      expect(current_path).to eq "/signin"
      fill_in "email", with: @user.email
      fill_in "password", with: "aaa"
      click_button("ログイン")
      expect(page).to have_content "メールアドレス、パスワードが間違っています。"
    end
  end
end


