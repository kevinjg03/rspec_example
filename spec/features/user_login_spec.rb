require 'rails_helper'

RSpec.feature 'Inicio de sesión', type: :feature, js: true do
  scenario "usuario inicia sesión correctamente" do
    visit new_user_session_path
    fill_in "email", with: "usuario@ejemplo.com"
    fill_in "password", with: "contraseña123"
    click_button "Iniciar Sesión"
    expect(page).to have_content("¡Inicio de sesión exitoso!")
  end

  scenario "usuario no inicia sesión con credenciales incorrectas" do
    visit new_user_session_path
    fill_in "email", with: "usuario@ejemplo.com"
    fill_in "password", with: "contraseñaIncorrecta"
    click_button "Iniciar Sesión"
    expect(page).to have_content("Error en el inicio de sesión")
  end
end