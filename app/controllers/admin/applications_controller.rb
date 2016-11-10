class Admin::ApplicationsController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	before_action :find_app, except: [:index, :new, :create]
	def index
		@applications = Application.paginate(page: params[:page], :per_page => 11)
	end

	def new
		@application = Application.new
		@categories = Category.all
	end

	def create
		@application = Application.new application_params
		if @application.save
			params[:application][:category_ids].each do |id|
				category = Category.find_by id: id
				unless category.nil? || @application.categories.include?(category)
					@application.categories << category
				end
			end
			flash[:success] = "Application created"
			redirect_to admin_applications_path
		else
			render :new
		end
	end

	def edit
		@categories = Category.all
	end

	def update
		if @application.update application_params
			params[:application][:category_ids].each do |id|
				category = Category.find_by id: id
				unless category.nil? || @application.categories.include?(category)
					@application.categories << category
				end
			end
			flash[:success] = "Application Updated"
			redirect_to admin_application_path
		else
			render :edit
		end
	end

	def show
	end

	def destroy
		@application.destroy
		flash[:success] = "App deleted!"
		redirect_to admin_applications_path
	end

	private
	def find_app
		@application = Application.find_by id: params[:id]
		if @application.nil?
			flash.now[:danger] = "Can't display app information"
			redirect_to root_path
		end
	end
	
	def application_params
    	params.require(:application).permit :application_name, :description, :appimage
	end

	def categories_params
		params.require(:application).permit category_ids: []
	end
end
