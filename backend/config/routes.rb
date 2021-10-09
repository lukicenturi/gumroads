Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show, :create] do
        post 'review', to: 'product_reviews#create'
      end
    end
  end

  mount ActionCable.server => '/cable'
end
