class AppController < ApplicationController
    before_action :authenticate_user!, only: [:update]
    
    def index
        @applications = Application.app_show(params[:id])
        @reviews = Review.where('application_id LIKE ?', params[:id]).order("created_at DESC")
        if user_signed_in?
            @review_logged = Review.find_by user_id: current_user.id, application_id: params[:id]
            @reviews = Review.where('application_id LIKE ? and user_id != ?', params[:id], current_user.id).order("created_at DESC")
        end
    end
    
    def update
        if Review.find_by user_id: params[:user_id], application_id: params[:app_id]
            Review.where('user_id LIKE ? and application_id LIKE ?', params[:user_id], params[:app_id]).update_all(
                :user_id => params[:user_id],
                :application_id => params[:app_id],
                :comment => params[:comment],
                :star => params[:rating]  
            )
        else    
            @review = Review.create(
                :user_id => params[:user_id],
                :application_id => params[:app_id],
                :comment => params[:comment],
                :star => params[:rating]    
            )  
        end    
        respond_to do |format|
            format.json  { render :json => params[:user_id].to_json, :status => :ok }
        end
    end    
end
