window.onload = () => {
  // Fetch Product List
  $.get('/api/v1/products', (products) => {
    let proudctsTpl = ``;
    products.forEach((product) => {
      const roundedRating = Math.round(product.average_rating);
      const ratingTemplate = getStarsTemplate(roundedRating);

      proudctsTpl += `
        <div class="product-card">
          <a class="product-name" href="/products/${product.id}">
            ${product.name}
          </a>
          <div class="product-rating">
            <div class="product-rating-number">${product.average_rating.toFixed(1)}</div>
            <div class="product-rating-stars">
              ${ratingTemplate}
            </div>
          </div>
        </div>
      `;
    });

    $("#productGrid").html(proudctsTpl);

    $("#productListSection").removeClass('hide');
  });
}
