class Product < ApplicationRecord
  has_many :product_reviews, dependent: :destroy

  # Append Average Rating of Product
  default_scope do
    includes(:product_reviews)
      .left_joins(:product_reviews)
      .group('products.id')
      .select('products.*, IFNULL(CAST(CAST(AVG(rating) as DECIMAL(2, 1)) as FLOAT), 0) as average_rating')
  end
end
