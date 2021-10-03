window.onload = () => {
  const id = $("#productId").val();

  // Fetch Product
  $.get(`/api/v1/products/${id}`, (product) => {

    // Set Product Detail
    $("#productName").html(product.name);
    $("#productRatingNumber").html(product.average_rating.toFixed(1));

    const roundedRating = Math.round(product.average_rating);
    const ratingTemplate = getStarsTemplate(roundedRating);
    $("#productRatingStars").html(ratingTemplate);

    // Set Product Review
    let productReviewTpl = ``;
    product.product_reviews.forEach((review) => {
      const reviewRatingTemplate = getStarsTemplate(review.rating);

      productReviewTpl += `
        <div class="product-review">
          <div class="product-rating-stars">
            ${reviewRatingTemplate}
          </div>
          <div class="product-review-text">
            <strong>${review.rating}</strong>,&nbsp;
            ${review.review}
          </div>
        </div>
      `;
    })

    $("#productReviewGrid").html(productReviewTpl);

    $("#productDetailSection").removeClass('hide');
  });
}
