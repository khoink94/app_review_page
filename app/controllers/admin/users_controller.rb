class Admin::UsersController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	before_action :find_user, only: :show
	def index
		@users = User.paginate(page: params[:page], :per_page => 11)
	end

	def show
	end

	private
	def find_user
		@user = User.find_by id: params[:id]
		if @user.nil?
			flash.now[:danger] = "Can't display user information"
			redirect_to root_path
		end
	end
end
