class StaticPagesController < ApplicationController
	def home
		@applications = Application.app_search(nil,nil).paginate(page: params[:page], :per_page => 16)
		@applications_orderby_rating = Application.all.sort { |a,b| b.average_rating <=> a.average_rating }
		@categories = Category.all
	end
	
	def category
		@applications = Application.app_search(nil,params[:category]).paginate(page: params[:page], :per_page => 16)
		@categories = Category.all
	end
	
	def ranking
		@applications = Application.app_search(nil,nil).sort { |a,b| b.average_rating <=> a.average_rating }.paginate(page: params[:page], :per_page => 16)
		@categories = Category.all
	end
	
	def recent
		@applications = Application.app_search(nil,nil).paginate(page: params[:page], :per_page => 16)
		@categories = Category.all
	end 
end
