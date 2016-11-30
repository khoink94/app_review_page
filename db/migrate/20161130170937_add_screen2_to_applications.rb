class AddScreen2ToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :screen2, :string
  end
end
