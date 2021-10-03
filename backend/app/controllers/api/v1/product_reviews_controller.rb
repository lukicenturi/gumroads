class Api::V1::ProductReviewsController < ApplicationApiController
  def create
    product = Product.find(product_review_params[:product_id])
    product_review = product.product_reviews.create(product_review_params)

    if product_review.save
      render json:product_review, status: 200
    else
      render json: {error: "Add Review Error."}
    end
  end

  private
  def product_review_params
    params.permit([
      :product_id,
      :rating,
      :review
    ])
  end
end
