require 'rails_helper'

RSpec.describe "Posts", type: :request do
  describe "GET /index" do
    it "devuelve un estado exitoso" do
      get posts_path
      expect(response).to have_http_status(:success)
    end

    it "devuelve todos los posts" do
      get posts_path
      expect(response.body).to include("Posts")
    end

    it "devuelve un post específico" do
      post = Post.create(title: "Test Post", content: "This is a test post")
      get post_path(post)
      expect(response.body).to include("Test Post")
    end

    it "devuelve un estado 404 si el post no existe" do
      get post_path(999)
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /create" do
    it "crea un nuevo post" do
      expect {
        post posts_path, params: { post: { title: "Test Post", content: "This is a test post" } }
      }.to change(Post, :count).by(1)
    end

    it "no crea un nuevo post si los datos son inválidos" do
      expect {
        post posts_path, params: { post: { title: nil, content: "This is a test post" } }
      }.not_to change(Post, :count)

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "no crea un nuevo post si el usuario no está autenticado" do
      expect {
        post posts_path, params: { post: { title: "Test Post", content: "This is a test post" } }
      }.not_to change(Post, :count)

      expect(response).to have_http_status(:unauthorized)
    end

    it "no crea un nuevo post si el usuario no tiene permisos" do
      user = User.create(email: "test@example.com", password: "password")
      sign_in user
      expect {
        post posts_path, params: { post: { title: "Test Post", content: "This is a test post" } }
      }.not_to change(Post, :count)

      expect(response).to have_http_status(:forbidden)
    end
  end

  describe "PUT /update" do 
    it "actualiza un post existente" do
      post = Post.create(title: "Test Post", content: "This is a test post")
      put post_path(post), params: { post: { title: "Updated Post", content: "This is an updated post" } }
      expect(response).to have_http_status(:ok)
      expect(post.reload.title).to eq("Updated Post")
    end

    it "no actualiza un post si los datos son inválidos" do
      post = Post.create(title: "Test Post", content: "This is a test post")
      put post_path(post), params: { post: { title: nil, content: "This is a test post" } }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "no actualiza un post si el usuario no está autenticado" do
      post = Post.create(title: "Test Post", content: "This is a test post")
      put post_path(post), params: { post: { title: "Updated Post", content: "This is an updated post" } }
      expect(response).to have_http_status(:unauthorized)
    end

    it "no actualiza un post si el usuario no tiene permisos" do
      post = Post.create(title: "Test Post", content: "This is a test post")
      user = User.create(email: "test@example.com", password: "password")
      sign_in user
      put post_path(post), params: { post: { title: "Updated Post", content: "This is an updated post" } }
      expect(response).to have_http_status(:forbidden)
    end

  end
end
