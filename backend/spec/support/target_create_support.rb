module TargetCreateSupport
  def target_create(target)
    click_on(target.field.field_name)
    click_button("目標新規作成")
    fill_in "target-name", with: target.target_name
    fill_in "target-temp", with: target.target_temp
    fill_in "memo", with: target.memo
    click_button("登録")
    expect(page).to have_content target.target_name
    expect(page).to have_content "目標を作成しました"
  end
end
