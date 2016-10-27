class Admin::ApplicationsController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	before_action :find_app, only: :show
	def index
		@applications = Application.paginate(page: params[:page], :per_page => 11)
	end

	def show
	end

	private
	def find_app
		@application = Application.find_by id: params[:id]
		if @application.nil?
			flash.now[:danger] = "Can't display app information"
			redirect_to root_path
		end
	end
end
