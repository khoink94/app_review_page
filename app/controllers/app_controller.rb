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
        if params[:review_id].present?
            if Review.find_by(id: params[:review_id]).likes.find_by(user_id: params[:user_id]).present?
                Like.find_by(user_id: params[:user_id], review_id: params[:review_id]).destroy()
            else
                Like.create(
                    :review_id => params[:review_id],
                    :user_id => params[:user_id]
                )
            end    
            respond_to do |format|
                format.json  { render :json => Review.find_by(id: params[:review_id]).likes.count().to_json, :status => :ok }
            end
        else    
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
            @application = Application.find_by id: params[:app_id]
            @data = [
                :average_rating => @application.average_rating(),
                :size => @application.reviews.size,
                :rating_percent_5 => @application.rating_percent(5),
                :rating_count_5 => @application.rating_count(5),
                :rating_percent_4 => @application.rating_percent(4),
                :rating_count_4 => @application.rating_count(4),
                :rating_percent_3 => @application.rating_percent(3),
                :rating_count_3 => @application.rating_count(3),
                :rating_percent_2 => @application.rating_percent(2),
                :rating_count_2 => @application.rating_count(2),
                :rating_percent_1 => @application.rating_percent(1),
                :rating_count_1 => @application.rating_count(1),
            ]
            respond_to do |format|
                format.json  { render :json => @data[0].to_json, :status => :ok }
            end
        end    
    end    
end
