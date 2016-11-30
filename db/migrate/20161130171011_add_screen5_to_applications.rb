class AddScreen5ToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :screen5, :string
  end
end
