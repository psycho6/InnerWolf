import { products } from "./data/products.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

function generateProductCards() {
  const productsContainer = document.querySelector(".products-container");

  let productsContainerHTML = '';
  // Loop through products to create slides
  products.forEach((product) => {
    const firstModel = product.models[0];
    productsContainerHTML += `
      <div class='swiper-slide product-card'>
        <img class='product-image' src='${firstModel.image}' alt='${product.name}'>
        <div class='product-text'>
          <h1 class='product-title'>${product.name}</h1>
          <h2 class='product-price'>${product.price} DA</h2>
          <button class='buy-now' data-product-id='${product.id}'>BUY NOW</button>
          <button class='add-to-cart' data-product-id='${product.id}'>ADD TO CART</button>
        </div>
      </div>
    `;
  });

  productsContainer.innerHTML = productsContainerHTML;

  // Wait for the content to be added before initializing Swiper
  setTimeout(() => {
    const swiper = new Swiper('.swiper-container', {
      effect: 'slides',
      coverflowEffect: {
        rotate: 30,  // Rotation angle
        stretch: 50,  // Stretch slides
        depth: 100,  // Depth of 3D effect
      },
      slideShadows: true,
      slidesPerView: 4, // Display one product card at a time
      spaceBetween: 10, // Space between slides (adjust as needed)
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop : true,
    });
    
    // Update Swiper after content insertion
    swiper.update();
  }, 0);
}

generateProductCards();

// Handle Buy Now Button click
const buyNowButtons = document.querySelectorAll('.buy-now');
buyNowButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = event.target.getAttribute('data-product-id');
    const selectedProduct = products.find(product => product.id === productId);
    // Save product data to local storage
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    // Navigate to the product page
    window.location.href = '/pages/product.html';
  });
});

// Handle Add to Cart Button click
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = event.target.getAttribute('data-product-id');
    const selectedProduct = products.find(product => product.id === productId);

    // Check if the cart already exists in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    const productIndex = cart.findIndex(item => item.id === selectedProduct.id);
    if (productIndex > -1) {
      // If the product is already in the cart, increase the quantity
      cart[productIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
      console.log(cart);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart notification
    updateCartNotification();

  });
});

// Function to update cart notification bubble
function updateCartNotification() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartNotification = document.querySelector('.cart-notification');

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  if (totalItems > 0) {
    cartNotification.textContent = totalItems;  // Show the number of items in the cart
    cartNotification.style.display = 'block';   // Show the notification bubble
  } else {
    cartNotification.style.display = 'none';    // Hide the notification bubble if cart is empty
  }
}

// Initialize the cart notification on page load
window.addEventListener('load', () => {
  updateCartNotification();
});

// Cart Logo click: Navigate to the cart page
const cartLogo = document.querySelector('.cart-logo');
cartLogo.addEventListener('click', () => {
  window.location.href = '/pages/cart.html';
});
