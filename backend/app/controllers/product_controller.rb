class ProductController < ApplicationController
  def index
    render '/index'
  end

  def detail
    render '/detail'
  end
end
