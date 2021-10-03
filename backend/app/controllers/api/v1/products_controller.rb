class Api::V1::ProductsController < ApplicationApiController
  def index
    products = Product.all
    render json: products, status: 200
  end

  def show
    product = Product.find_by(id: params[:id])
    if product
      render json:product, include: [:product_reviews], status: 200
    else
      render json: {error: "Product Not Found."}
    end
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json:product, status: 200
    else
      render json: {error: "Create Product Error."}
    end
  end

  private
  def product_params
    params.permit([
      :name
    ])
  end
end
