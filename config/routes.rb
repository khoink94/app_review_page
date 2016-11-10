Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get '/search', to: 'search#index'
  get '/app', to: 'app#index'
  root "static_pages#home"

  namespace :admin do
  	root "users#index"
  	resources :applications, only: [:index, :new, :show]
  	resources :categories, only: [:index, :new, :show]
  	resources :users, only: [:index, :new, :show]
  end
end
