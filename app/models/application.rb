class Application < ApplicationRecord
	has_many :reviews
	has_many :company_applications
	has_many :application_categories
  has_many :categories, :through => :application_categories
  mount_uploader :appimage, AppimageUploader

	
	def self.app_search(search,category)
    if search
      if category
        self
          .select("applications.*,companies.company_name")
          .left_outer_joins(company_applications: :company)
          .left_outer_joins(application_categories: :category)
          .where('application_name LIKE ? OR applications.description LIKE ?', "%#{search}%", "%#{search}%")
          .where('category_name = ?', "%#{search}%")
      else
        self
          .select("applications.*,companies.company_name")
          .left_outer_joins(company_applications: :company)
          .left_outer_joins(application_categories: :category)
          .where('application_name LIKE ? OR applications.description LIKE ?', "%#{search}%", "%#{search}%")
      end    
    else
      self.select("applications.*,companies.company_name").left_outer_joins(company_applications: :company)
    end
  end

  
end
