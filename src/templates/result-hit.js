const resultHit = (hit) => `
  <div class="result-hit">

    <!-- IMAGE -->
    <div class="result-hit__image-container">
      <img
        class="result-hit__image"
        src="${hit.image}"
        alt="${hit._highlightResult?.name?.value || hit.name}"
      />
    </div>

    <!-- DETAILS -->
    <div class="result-hit__details">
      <h3 class="result-hit__name">
        ${hit._highlightResult?.name?.value || hit.name}
      </h3>

      <p class="result-hit__price">
        $${hit.price}
      </p>
    </div>

    <!-- ACTIONS -->
    <div class="result-hit__controls">

      <!-- VIEW -->
      <button
        type="button"
        class="result-hit__view"
      >
        View
      </button>

      <!-- WISHLIST -->
      <button
        type="button"
        class="result-hit__wishlist"
      >
        ♡ Wishlist
      </button>

      <!-- ADD TO CART -->
      <button
        type="button"
        class="result-hit__cart"
      >
        Add to cart
      </button>

    </div>

  </div>
`;

export default resultHit;