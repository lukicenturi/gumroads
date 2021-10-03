class ProductController < ApplicationController
  def index
    render '/index'
  end

  def detail
    @id = params[:id]
    render '/detail'
  end
end
