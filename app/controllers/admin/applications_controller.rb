class Admin::ApplicationsController < ApplicationController
	before_action :authenticate_user!, :verify_admin
	before_action :find_app, except: [:index, :new, :create]
	def index
		if params[:application_hint].nil?
			@applications = Application.paginate(page: params[:page], :per_page => 11)
		else
			@applications = Application.where("application_name LIKE :name", name: "%#{params[:application_hint]}%")
							.paginate(page: params[:page], :per_page => 11)
		end
	end

	def new
		@application = Application.new
		@categories = Category.all
	end

	def create
		@application = Application.new application_params
		if @application.save
			if params[:category_ids].present?
				params[:category_ids].each do |id|
					category = Category.find_by id: id
					unless category.nil? || @application.categories.include?(category)
						@application.categories << category
					end
				end
			end
			flash[:success] = "Application created"
			redirect_to admin_applications_path
		else
			load_categories
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
			load_categories
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
    	params.require(:application).permit :application_name, :description, :appimage, :screen1, :screen2, :screen3, 
    	:screen4, :screen5, :device, :team
	end

	def categories_params
		params.require(:application).permit category_ids: []
	end

	def load_categories
		@categories = Category.all
	end
end
