class AddCategoryimageToCategories < ActiveRecord::Migration[5.0]
  def change
    add_column :categories, :categoryimage, :string
  end
end
