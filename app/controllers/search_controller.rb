class SearchController < ApplicationController
    def index
		@applications = Application.app_search(params[:search])
    end
end
