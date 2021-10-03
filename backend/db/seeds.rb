# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Product.create([
 { id: 1, name: 'The Minimalist Entrepreneur' },
 { id: 2, name: 'The Lean Startup' },
 { id: 3, name: 'True North' },
 { id: 4, name: 'The Effective Executive' },
 { id: 5, name: 'Blink' },
 { id: 6, name: 'Crushing' },
 { id: 7, name: 'Start With Why' },
 { id: 8, name: 'Measure What Matters' },
 { id: 9, name: 'The Hard Thing About Hard Things' },
 { id: 10, name: 'The Simplicity Cycle' },
])

ProductReview.create([
 { product_id: 1, rating: 4, review: 'book was full of fluff' },
 { product_id: 1, rating: 3, review: 'book was fluff' },
 { product_id: 1, rating: 4, review: 'book was amazing' },
])
