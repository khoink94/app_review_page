Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get '/search', to: 'search#index'
  root "static_pages#home"

  namespace :admin do
  	root "static_pages#home"
  	resources :applications, only: [:index, :new]
  end
end
