class Admin::ApplicationsController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	def index
		@applications = Application.paginate(page: params[:page], :per_page => 11)
	end
end
