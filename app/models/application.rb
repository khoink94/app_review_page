class Application < ApplicationRecord
	has_many :reviews
	
	def self.app_search(search)
    if search
      self.where('name LIKE ?', "%#{search}%")
    else
      self.all
    end
  end
  
end
