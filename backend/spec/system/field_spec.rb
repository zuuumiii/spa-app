require "rails_helper"

RSpec.describe '圃場削除', type: :system, js: true do
  before do
    @field = FactoryBot.build(:field)
  end

  context '圃場削除できるとき' do 
    it '圃場が削除すると一覧から消える' do
      sign_in(@field.user)
      field_create(@field)
      click_on(@field.field_name)
      find("#delete").click
      click_button("OK")
      sleep(2)
      expect(current_path).to eq "/"
      expect(page).to have_no_content @field.field_name
    end
  end
  context '圃場削除をキャンセルしたとき' do 
    it '削除をキャンセルすると一覧に残っている' do
      sign_in(@field.user)
      field_create(@field)
      click_on(@field.field_name)
      find("#delete").click
      click_button("キャンセル")
      sleep(2)
      expect(page).to have_content @field.field_name
    end
  end
end

RSpec.describe '圃場編集', type: :system, js: true do
  before do
    @field = FactoryBot.build(:field)
  end

  context '圃場編集できるとき' do 
    it '正しい情報で圃場が編集でき、一覧表示に反映される' do
      sign_in(@field.user)
      field_create(@field)
      click_on(@field.field_name)
      find("#field-update").click
      fill_in "fieldName", with: "圃場1"
      click_button("登録")
      sleep(2)
      expect(current_path).to eq "/"
      expect(page).to have_content "圃場1"
    end
  end
  context '圃場編集できないとき' do 
    it '間違った情報で登録すると、エラーが発生' do
      sign_in(@field.user)
      field_create(@field)
      click_on(@field.field_name)
      find("#field-update").click
      fill_in "fieldName", with: "#{"a" * 19}"
      click_button("登録")
      sleep(2)
      expect(page).to have_content "圃場名は18文字以内で入力してください"
    end
  end
end

RSpec.describe '圃場登録', type: :system, js: true do
  before do
    @field = FactoryBot.build(:field)
  end

  context '圃場登録できるとき' do 
    it '正しい情報で圃場が登録できる' do
      sign_in(@field.user)
      field_create(@field)
    end
  end
  context '圃場登録できないとき' do 
    it '間違った情報で登録すると、エラーが発生し新規登録ページに残る' do
      sign_in(@field.user)
      find("#field-create").click
      expect(current_path).to eq "/fieldCreate"
      fill_in "fieldName", with: @field.field_name
      fill_in "product", with: @field.product
      fill_in "area", with: 99999
      fill_in "info", with: @field.info
      click_button("登録")
      sleep(2)
      expect(current_path).to eq "/fieldCreate"
      expect(page).to have_content "面積は10000より小さい値にしてください"
    end
  end
end
