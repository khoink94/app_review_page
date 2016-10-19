class CreateCompanyApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :company_applications do |t|
      t.references :company, foreign_key: true
      t.references :application, foreign_key: true

      t.timestamps
    end
    add_index :company_applications, [:company_id, :application_id]
  end
end
