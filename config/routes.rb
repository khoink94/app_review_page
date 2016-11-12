Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get '/search', to: 'search#index'
  get '/app', to: 'app#index'
  get '/app/update', to: 'app#update'
  root "static_pages#home"

  namespace :admin do
  	root "users#index"
  	resources :applications
  	resources :categories
  	resources :users, only: [:index, :show]
  end
end
