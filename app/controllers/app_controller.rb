class AppController < ApplicationController
    def index
        @application = Application.find_by(application_name: params[:name])
    end        
end
