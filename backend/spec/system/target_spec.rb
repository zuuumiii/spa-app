require "rails_helper"

RSpec.describe '圃場編集', type: :system, js: true do
  before do
    @target = FactoryBot.build(:target)
  end

  context '目標編集できるとき' do 
    it '正しい情報で圃場を編集したら、作成メッセージと共に一覧に反映される' do
      sign_in(@target.field.user)
      field_create(@target.field)
      target_create(@target)
      click_on(@target.target_name)
      fill_in "target-name", with: "目標1"
      click_button("登録")
      expect(page).to have_content "目標を更新しました"
      expect(page).to have_content "目標1"
    end
  end
  context '圃場登録できないとき' do 
    it '間違った情報で登録すると、エラーが発生し表示されない' do
      sign_in(@target.field.user)
      field_create(@target.field)
      target_create(@target)
      click_on(@target.target_name)
      fill_in "target-temp", with: 99999
      click_button("登録")
      expect(page).to have_content "目標温度は10000より小さい値にしてください"
      expect(page).to have_no_content 99999
    end
  end
end


RSpec.describe '圃場登録', type: :system, js: true do
  before do
    @target = FactoryBot.build(:target)
  end

  context '目標登録できるとき' do 
    it '正しい情報で圃場が登録したら、作成メッセージと共に一覧に表示される' do
      sign_in(@target.field.user)
      field_create(@target.field)
      target_create(@target)

    end
  end
  context '圃場登録できないとき' do 
    it '間違った情報で登録すると、エラーが発生し表示されない' do
      sign_in(@target.field.user)
      field_create(@target.field)
      click_on(@target.field.field_name)
      click_button("目標新規作成")
      fill_in "target-name", with: "#{"a" * 19}"
      fill_in "target-temp", with: @target.target_temp
      fill_in "memo", with: @target.memo
      click_button("登録")
      expect(page).to have_no_content @target.target_name
      expect(page).to have_content "目標名は18文字以内で入力してください"
    end
  end
end
