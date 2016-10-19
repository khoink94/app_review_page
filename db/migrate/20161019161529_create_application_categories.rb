class CreateApplicationCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :application_categories do |t|
      t.references :category, foreign_key: true
      t.references :application, foreign_key: true

      t.timestamps
    end
    add_index :application_categories, [:category_id, :application_id]
  end
end
