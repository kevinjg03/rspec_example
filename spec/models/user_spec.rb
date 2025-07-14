require 'rails_helper'

RSpec.describe User, type: :model do
  it "es válido con atributos válidos" do
    user = User.new(email: "usuario@ejemplo.com", password: "contraseña123")
    expect(user).to be_valid
  end

  it "no es válido sin un correo electrónico" do
    user = User.new(email: nil, password: "contraseña123")
    expect(user).not_to be_valid
  end

  it "no es válido sin una contraseña" do
    user = User.new(email: "usuario@ejemplo.com", password: nil)
    expect(user).not_to be_valid
  end

  it "no es válido si la contraseña es demasiado corta" do
    user = User.new(email: "usuario@ejemplo.com", password: "corta")
    expect(user).not_to be_valid
  end

  it "no es válido si el correo electrónico ya está en uso" do
    User.create!(email: "usuario@ejemplo.com", password: "contraseña123")
    user2 = User.new(email: "usuario@ejemplo.com", password: "otraClave123")
    expect(user2).not_to be_valid
  end
end
