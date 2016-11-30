class AddScreen4ToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :screen4, :string
  end
end
