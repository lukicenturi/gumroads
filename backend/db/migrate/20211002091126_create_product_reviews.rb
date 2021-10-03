class CreateProductReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :product_reviews do |t|
      t.integer :rating
      t.text :review

      t.timestamps
    end
  end
end
