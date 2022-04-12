require "rails_helper"

RSpec.describe '圃場登録', type: :system, js: true do
  before do
    @field = FactoryBot.build(:field)
  end

  context '圃場登録できるとき' do 
    it '正しい情報で圃場が登録できる' do
      sign_in(@field.user)
      find("#field-create").click
      expect(current_path).to eq "/fieldCreate"
      fill_in "field-name", with: @field.field_name
      fill_in "product", with: @field.product
      fill_in "area", with: @field.area
      fill_in "info", with: @field.info
      click_button("登録")
      sleep(2)
      expect(current_path).to eq "/"
      expect(page).to have_content @field.field_name
    end
  end
  context '圃場登録できないとき' do 
    it '間違った情報で登録すると、エラーが発生し新規登録ページに残る' do
      sign_in(@field.user)
      find("#field-create").click
      expect(current_path).to eq "/fieldCreate"
      fill_in "field-name", with: @field.field_name
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
