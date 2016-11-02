class StaticPagesController < ApplicationController
	def home
		@applications = Application.app_search(params[:search],nil).paginate(page: params[:page], :per_page => 16)
		@categories = Category.all
	end
end
