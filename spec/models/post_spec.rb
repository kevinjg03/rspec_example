require 'rails_helper'

RSpec.describe Post, type: :model do
  it "es válido con atributos válidos" do
    post = Post.new(title: "Título de prueba", content: "Contenido de prueba")
    expect(post).to be_valid
  end

  it "no es válido sin un título" do
    post = Post.new(title: nil, content: "Contenido de prueba")
    expect(post).not_to be_valid
  end

  it "no es válido sin contenido" do
    post = Post.new(title: "Título de prueba", content: nil)
    expect(post).not_to be_valid
  end
end
