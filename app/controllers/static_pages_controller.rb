class StaticPagesController < ApplicationController
	def home
		@search_app = Application.search do 
			fulltext params[:search]
		end
		@applications = @search_app.results
		
		@search_user = User.search do 
			fulltext params[:search]
		end
		@users = @search_user.results
	end
end
