class AppController < ApplicationController
    def index
        @application = Application.app_search(params[:name],'').first
    end        
end
