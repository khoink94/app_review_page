class CreateCompanies < ActiveRecord::Migration[5.0]
  def change
    create_table :companies do |t|
      t.string :address
      t.text :description

      t.timestamps
    end
  end
end
