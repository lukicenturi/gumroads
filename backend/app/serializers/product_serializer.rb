class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :average_rating
  has_many :product_reviews
end
