class AddAppimageToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :appimage, :string
  end
end
