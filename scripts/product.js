import { wilayas } from "./data/wilayas.js";
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

// List of Algerian wilayas with codes

function generateColorBubbles() {
    let colorBubblesHtml = '';
    selectedProduct.models.forEach((model, index) => {
        colorBubblesHtml += `
            <div class='color-selection ${model.color}' data-color="${model.color}" data-index="${index}"></div>
        `;
    });
    return colorBubblesHtml;
}

function generateSizeButtons() {
    const sizes = [
        { size: "M", range: "71kg-79kg" },
        { size: "L", range: "80kg-86kg" },
        { size: "XL", range: "87kg-93kg" },
        { size: "XXL", range: "95kg-110kg" }
    ];

    let sizeButtonsHtml = '';
    sizes.forEach(size => {
        sizeButtonsHtml += `
            <button class="size-selection" data-size="${size.size}">
                ${size.size} <span>(${size.range})</span>
            </button>
        `;
    });

    return sizeButtonsHtml;
}

function generateForm() {
    const wilayaOptions = wilayas
        .map(wilaya => `<option value="${wilaya.code}-${wilaya.name}">${wilaya.code}-${wilaya.name}</option>`)
        .join('');

    return `
        <form class="user-details-form">
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="tel" name="phone" placeholder="Phone Number" required>
            <select name="wilaya" required>
                <option value="" disabled selected>Wilaya</option>
                ${wilayaOptions}
            </select>
            <input type="text" name="mairie" placeholder="City" required>
            <button type="submit" class="submit-button">BUY</button>
        </form>
    `;
}

function generateProduct(selectedProduct) {
    const productContainer = document.querySelector('.product-container');
    const colorBubblesHtml = generateColorBubbles();
    const sizeButtonsHtml = generateSizeButtons();
    const firstModel = selectedProduct.models[0];
    
    const productHTML = `
        <div class="product-flyer">
            <img src="${firstModel.image}" alt="product" id="product-image">
        </div>
        <div class="color-selection-container">
            ${colorBubblesHtml}
        </div>
        <div class="product-text">
            <h1 class="product-name">${selectedProduct.name}</h1>
            <h2 class="product-price">${selectedProduct.price} DA</h2>
            <h3>You will get a call to discuss size and color</h3>
            <div class="size-selection-container">
                ${sizeButtonsHtml}
            </div>
        </div>
    `;

    productContainer.innerHTML = productHTML;

    // Create and append the form container below the product
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.innerHTML = generateForm();
    document.body.appendChild(formContainer);

    // Add event listeners for color bubbles
    const colorBubbles = document.querySelectorAll('.color-selection');
    colorBubbles.forEach(bubble => {
        bubble.addEventListener('click', (event) => {
            const selectedColor = event.target.getAttribute('data-color');
            const modelIndex = event.target.getAttribute('data-index');
            const selectedModel = selectedProduct.models[modelIndex];
            
            const productImage = document.getElementById('product-image');
            
            // Add fade-out effect
            productImage.classList.add('fading-out');
            
            // After the fade-out effect completes (500ms), change the image and fade it back in
            setTimeout(() => {
                productImage.src = selectedModel.image; // Update image based on the selected model
                productImage.classList.remove('fading-out');
            }, 500); 
        });
    });

    // Add event listeners for size buttons
    const sizeButtons = document.querySelectorAll('.size-selection');
    sizeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove the selected size class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('selected-size'));

            // Add the selected-size class to the clicked button
            event.target.classList.add('selected-size');
        });
    });
}

// Load product content and form
window.addEventListener('load', () => generateProduct(selectedProduct));
