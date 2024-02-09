// Import variable cart from cart.js
// Uses ../../ to go out from 2 folders
import { cart, addToCart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary" data-product-id = "${
        product.id
      }">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

// Count cart quantity function
function countCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Dataset use for taking all the data from the button in the data atribut
    const { productId } = button.dataset;
    // Add to cart function
    addToCart(productId);

    // Count cart quantity function
    countCartQuantity();

    const addedMessage = document.querySelector(`.added-to-cart-${productId}`);

    addedMessage.classList.add("added-to-cart-visible");

    // Use object to save the timeoutIds
    // Using object because every products has their own id
    const addedMessageTimeouts = {};

    // Check if there's previous timeout for the product
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    // Remove added-to-cart-visible after 2 seconds
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    // Save the timeoutId for the product
    addedMessageTimeouts[productId] = timeoutId;

    console.log(cart);
  });
});
