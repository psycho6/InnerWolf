const cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart items from localStorage
import { wilayas } from "../scripts/data/wilayas.js"; // List of wilayas

// Function to generate product items in the cart
function generateCartItems() {
    const cartProductsContainer = document.getElementById('cart-products-list');
    cartProductsContainer.innerHTML = ''; // Clear the container first

    let totalValue = 0;
    cart.forEach((item, index) => {
        const productHTML = `
            <div class="cart-product-item">
                <img src="${item.models[0].image}" alt="${item.name}">
                <div class="product-info">
                    <span class="product-name">${item.name}</span>
                    <span class="product-price">${item.price} DA</span>
                    <div class="product-controls">
                        <button class="decrease-quantity quantity-button" data-index="${index}">-</button>
                        <span class="product-quantity">${item.quantity}</span>
                        <button class="increase-quantity quantity-button" data-index="${index}">+</button>
                        <button class="delete-item delete-button" data-index="${index}">Delete</button>
                        </div>
                    
                </div>
            </div>
        `;
        cartProductsContainer.innerHTML += productHTML;
        totalValue += item.price * item.quantity;
    });

    // Update the total value
    document.getElementById('total-value').textContent = totalValue;

    // Add event listeners for quantity modification and deletion
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            increaseQuantity(index);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            decreaseQuantity(index);
        });
    });

    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            deleteItem(index);
        });
    });
}

// Function to increase the quantity of an item
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Function to decrease the quantity of an item
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        deleteItem(index); // Delete item if quantity reaches 0
    }
    updateCart();
}

// Function to delete an item from the cart
function deleteItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to update the cart in localStorage and regenerate items
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    generateCartItems();
}

// Function to generate wilayas options for the form
function generateWilayasOptions() {
    const wilayaSelect = document.querySelector('select[name="wilaya"]');
    wilayas.forEach(wilaya => {
        const option = document.createElement('option');
        option.value = `${wilaya.code}-${wilaya.name}`;
        option.textContent = `${wilaya.code}-${wilaya.name}`;
        wilayaSelect.appendChild(option);
    });
}

// Function to handle the form submission
document.querySelector('.user-details-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Here you can handle the form data and complete the order
    const formData = new FormData(event.target);
    const orderDetails = Object.fromEntries(formData.entries());

    // Optionally, save the order or send to a backend
    alert('Your order has been placed!');

    // Clear cart after order
    localStorage.removeItem('cart');
    window.location.href = '/';
});

// Initialize the cart and wilayas
window.addEventListener('load', () => {
    generateCartItems();
    generateWilayasOptions();
});
