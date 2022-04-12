module SignInSupport
  def sign_in(user)
    visit "/"
    find("#signup").click
    fill_in "name", with: user.name
    fill_in "email", with: user.email
    fill_in "password", with: user.password
    fill_in "password-confirmation", with: user.password_confirmation
    click_button("登録")
    sleep(2)
    visit "/"
    expect(page).to have_content user.name
    expect(page).to have_no_content("ログイン")
    expect(page).to have_no_content("新規登録")
  end
end
