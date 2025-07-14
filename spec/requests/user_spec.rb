require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /index" do
    it "devuelve un estado exitoso" do
      get users_path
      expect(response).to have_http_status(:success)
    end

    it "devuelve todos los usuarios" do
      get users_path
      expect(response.body).to include("Users")
    end

    it "devuelve un usuario específico" do
      user = User.create(email: "test@example.com", password: "password")
      get user_path(user)
      expect(response.body).to include("test@example.com")
    end

    it "devuelve un estado 404 si el usuario no existe" do
      get user_path(999)
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /create" do
    it "crea un nuevo usuario" do
      expect {
        post new_user_registration_path, params: { user: { email: "test@example.com", password: "password" } }
      }.to change(User, :count).by(1)
    end
  end

  describe "PUT /update" do
    it "actualiza un usuario existente" do
      user = User.create(email: "test@example.com", password: "password")
      put edit_user_registration_path(user), params: { user: { email: "updated@example.com", password: "newpassword" } }
      expect(response).to have_http_status(:ok)
      expect(user.reload.email).to eq("updated@example.com")
    end
  end

  describe "DELETE /destroy" do
    it "elimina un usuario existente" do
      user = User.create(email: "test@example.com", password: "password")
      expect {
        delete destroy_user_registration_path(user)
      }.to change(User, :count).by(-1)
    end
  end
end
