module FieldCreateSupport
  def field_create(field)
    visit "/"
    find("#field-create").click
    expect(current_path).to eq "/fieldCreate"
    fill_in "fieldName", with: field.field_name
    fill_in "product", with: field.product
    fill_in "area", with: field.area
    fill_in "info", with: field.info
    click_button("登録")
    sleep(2)
    expect(current_path).to eq "/"
    expect(page).to have_content field.field_name
  end
end
