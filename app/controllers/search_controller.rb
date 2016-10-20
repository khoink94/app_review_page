class SearchController < ApplicationController
    def index
		@users = User.user_search(params[:search])
    end
end
