class Admin::CategoriesController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	before_action :find_category, only: :show
	def index
		@categories = Category.paginate(page: params[:page], :per_page => 11)
	end

	def show
	end

	private
	def find_category
		@category = Category.find_by id: params[:id]
		if @category.nil?
			flash.now[:danger] = "Can't display app information"
			redirect_to root_path
		end
	end
end
