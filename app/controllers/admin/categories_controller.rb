class Admin::CategoriesController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	before_action :find_category, except: [:index, :new, :create]
	def index
		@categories = Category.paginate(page: params[:page], :per_page => 11)
	end

	def new
		@category = Category.new
	end

	def create
		@category = Category.new category_params
		if @category.save
			flash[:success] = "Application created"
			redirect_to admin_categories_path
		else
			render :new
		end
	end

	def edit
	end

	def update
		if @category.update category_params
			flash[:success] = "Application Updated"
			redirect_to admin_category_path
		else
			render :edit
		end
	end

	def show
	end

	def destroy
		@category.destroy
		flash[:success] = "Category deleted!"
		redirect_to admin_categories_path
	end

	private
	def find_category
		@category = Category.find_by id: params[:id]
		if @category.nil?
			flash.now[:danger] = "Can't display app information"
			redirect_to root_path
		end
	end

	def category_params
		params.require(:category).permit :category_name, :categoryimage
	end
end
