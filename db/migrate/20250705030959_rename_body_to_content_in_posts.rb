class RenameBodyToContentInPosts < ActiveRecord::Migration[8.0]
  def change
    rename_column :posts, :body, :content
  end
end
