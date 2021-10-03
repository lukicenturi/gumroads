window.onload = () => {
  $.get('http://localhost:3000/api/v1/products', (products) => {
    let html = ``;

    products.forEach((product) => {
      const roundedRating = Math.round(product.average_rating);
      const ratingTemplate = [...Array(5)].map((e, i) =>
        `<i class="fas fa-star ${i < roundedRating ? 'active' : ''}"></i>`);

      html += `
        <div class="product-card">
          <a class="product-name" href="/products/${product.id}">
            ${product.name}
          </a>
          <div class="product-rating">
            <div class="product-rating-number">${product.average_rating}</div>
            <div class="product-rating-star">
              ${ratingTemplate.join('')}
            </div>
          </div>
        </div>
      `;
    });

    $("#product-grid").html(html);
  });
}
