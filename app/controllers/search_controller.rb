class SearchController < ApplicationController
    def index
		@applications = Application.app_search(params[:search],params[:category]).paginate(page: params[:page_app], :per_page => 16)
		@companies = Company.com_search(params[:search]).paginate(page: params[:page_com], :per_page => 16)
		@search = params[:search]
		@rateinput = params[:rateinput]
		@categories = Category.all
		@category = params[:category]
    end
end
