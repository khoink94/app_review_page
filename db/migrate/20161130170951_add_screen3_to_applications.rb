class AddScreen3ToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :screen3, :string
  end
end
