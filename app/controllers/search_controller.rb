class SearchController < ApplicationController
    def index
		@results = Application.app_search(params[:search],params[:category])
		@applications = []
		@results.each do |result|
			if result.average_rating.to_i >= params[:minrating].to_i
				@applications << result
			end
		end
		if @applications.present?
			@applications = @applications.paginate(page: params[:page_app], :per_page => 16)
		end	
		@companies = Company.com_search(params[:search]).paginate(page: params[:page_com], :per_page => 16)
		@search = params[:search]
		@minrating = params[:minrating]
		@categories = Category.all
		@category = params[:category]
    end
end
