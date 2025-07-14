require 'rails_helper'
RSpec.feature 'Home page', type: :feature, js: true do
  scenario "visitar la página de inicio" do
    visit home_path
    expect(page).to have_content("My Blog")
  end
end