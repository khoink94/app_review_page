Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get '/search', to: 'search#index'
  get '/app', to: 'app#index'
  get '/app/update', to: 'app#update'
  get '/ranking', to: 'static_pages#ranking'
  get '/recent', to: 'static_pages#recent'
  get '/category', to: 'static_pages#category'
  root "static_pages#home"

  resources :users, :only => [:show]

  namespace :admin do
  	root "users#index"
  	resources :applications
  	resources :categories
  	resources :users, only: [:index, :show]
  end
end
