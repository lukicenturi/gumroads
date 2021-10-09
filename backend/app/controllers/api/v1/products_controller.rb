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
      self.broadcastProducts
      render json:product, status: 200
    else
      render json: {error: "Create Product Error."}
    end
  end

  def self.broadcastProducts
    products = Product.all
    ActionCable.server.broadcast 'products_channel', products
  end

  def self.broadcastProduct(id)
    product = Product.find_by(id: id)
    serialized_data = ActiveModelSerializers::Adapter::Json.new(
      ProductSerializer.new(product)
    ).serializable_hash
    ProductChannel.broadcast_to product, serialized_data
  end

  private
  def product_params
    params.permit([
      :name
    ])
  end
end
