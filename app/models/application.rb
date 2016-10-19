class Application < ApplicationRecord
	has_many :reviews
	
	searchable do
	    text :name
	end
end
