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

  // Open Modal
  $("#addReview").on('click', () => {
    $("#addReviewModal").addClass('active');
  });

  // Close Modal
  $("#addReviewModalBackdrop").on('click', () => {
    $("#addReviewModal").removeClass('active');
  });

  const ratingInputStars = $("#review-rating-input").children();

  // set activated rating star
  const drawRatingStar = (rating) => {
    ratingInputStars.removeClass('active');

    ratingInputStars.each((index, el) => {
      if (index <= rating) {
        $(el).addClass('active');
      }
    })
  }

  // initialize rating input;
  let selectedRating = -1;
  let hoveredRating = -1;

  // detect selected rating
  ratingInputStars.each((index, el) => {
    $(el).on('mouseenter', () => {
      hoveredRating = index;
      drawRatingStar(hoveredRating);
    }).on('mouseout', () => {
      hoveredRating = selectedRating;
      drawRatingStar(hoveredRating);
    }).click(() => {
      selectedRating = index;
      drawRatingStar(selectedRating);
    })
  });

  // submit review to the backend
  window.submitReview = (e) => {
    e.preventDefault();

    $.post(`/api/v1/products/${id}/review`, {
      rating: selectedRating + 1,
      review: $("#review-text-input").val()
    }, () => {
      location.reload();
    })
  }
}
