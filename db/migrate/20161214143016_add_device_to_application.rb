class AddDeviceToApplication < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :device, :string
  end
end
