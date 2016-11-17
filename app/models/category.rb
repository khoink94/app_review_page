class Category < ApplicationRecord
    has_many :application_categories
    has_many :applications, :through => :application_categories
  	mount_uploader :categoryimage, CategoryimageUploader

  	validates :category_name, presence: true, uniqueness: {case_sensitive: false}    
end
