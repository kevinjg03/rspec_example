class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:home]
  before_action :debug_controller_params

  def debug_controller_params
    puts "--------------------------------"
    puts "Controller Params: #{params.inspect}"
    puts "--------------------------------"

    puts "--------------------------------"
    puts current_user.inspect
    puts "--------------------------------"

    puts "--------------------------------"
    puts current_user.present?
    puts "--------------------------------"
  end

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def edit
    @post = Post.find(params[:id])
  end

  def home
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      respond_to do |format|
        format.json { render json: @post, status: :created }
        format.html { redirect_to @post }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @post.errors }, status: :unprocessable_entity }
        format.html { render :new }
      end
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      respond_to do |format|
        format.json { render json: @post }
        format.html { redirect_to @post }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @post.errors }, status: :unprocessable_entity }
        format.html { render :edit }
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    respond_to do |format|
      format.json { head :no_content }
      format.html { redirect_to posts_path }
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
