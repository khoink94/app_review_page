class AddScreen1ToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :screen1, :string
  end
end
