class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.integer :star
      t.text :comment
      t.references :user, foreign_key: true
      t.references :application, foreign_key: true

      t.timestamps
    end
    add_index :reviews, [:user_id, :application_id, :created_at]
  end
end
