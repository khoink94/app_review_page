class Company < ApplicationRecord
    has_many :company_applications
    
    def self.com_search(search)
        if search
            self.where('company_name LIKE ? OR description LIKE ?', "%#{search}%", "%#{search}%")
        else
            self.all
        end
    end
end
