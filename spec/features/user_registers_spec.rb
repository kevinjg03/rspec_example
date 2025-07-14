require 'rails_helper'

RSpec.feature 'Registro de usuario', type: :feature do
  scenario "usuario se registra correctamente" do
    visit new_user_registration_path
    fill_in "Email", with: "usuario@ejemplo.com"
    fill_in "Password", with: "contraseña123"
    fill_in "Password confirmation", with: "contraseña123"
    click_button "Sign up"
    expect(page).to have_content("Welcome! You have signed up successfully.")
  end

  scenario "usuario no se registra con credenciales incorrectas" do
    visit new_user_registration_path
    fill_in "Email", with: "usuario@ejemplo.com"
    fill_in "Password", with: "contraseña123"
    fill_in "Password confirmation", with: "contraseñaIncorrecta"
    click_button "Sign up"
    expect(page).to have_content("Password confirmation doesn't match Password")
  end
end 