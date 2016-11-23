class Application < ApplicationRecord
	has_many :reviews
	has_many :company_applications
	has_many :application_categories
  has_many :categories, :through => :application_categories
  mount_uploader :appimage, AppimageUploader

	
	def self.app_search(search,category = 'all')
    if search
      if category == 'all'
        self
          .select("applications.*,companies.company_name")
          .left_outer_joins(company_applications: :company)
          .left_outer_joins(application_categories: :category)
          .where('application_name LIKE ? OR applications.description LIKE ?', "%#{search}%", "%#{search}%")
          .order("applications.created_at DESC")
          .group("applications.id")
      else
        self
          .select("applications.*,companies.company_name")
          .left_outer_joins(company_applications: :company)
          .left_outer_joins(application_categories: :category)
          .where('application_name LIKE ? OR applications.description LIKE ?', "%#{search}%", "%#{search}%")
          .where('category_name = ?', category)
          .order("applications.created_at DESC")
          .group("applications.id")
      end    
    else
      self
          .select("applications.*,companies.company_name")
          .left_outer_joins(company_applications: :company)
          .order("applications.created_at DESC")
    end
  end

  def self.app_show(id)
    self
      .select("applications.*,companies.company_name")
      .left_outer_joins(company_applications: :company)
      .left_outer_joins(application_categories: :category)
      .where('applications.id LIKE ?', id)
      .group("applications.id")
  end
  
  def average_rating
    if self.reviews.size > 0
        self.reviews.average(:star).round(1)
    else
        0
    end 
  end
  
  def rating_count(star)
    self.reviews.where(star: star).size
  end
  
  def rating_percent(star)
    if self.reviews.size > 0
      self.reviews.where(star: star).size * 100 / self.reviews.size 
    else 
      0
    end  
  end
  
end
