// Select elements
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let buyButtons = document.querySelectorAll('.buy-button');

let cart = [];

// Show/Hide Cart
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

// Add to Cart Function
const addToCart = (name, price, image) => {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();
};

// Update Cart UI
const updateCart = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        let cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="details">
                <div class="name">${item.name}</div>
                <div class="price">₹${item.price * item.quantity}</div> <!-- Multiply price with quantity -->
                <div class="quantity">
                    <button class="minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
            </div>
        `;
        listCartHTML.appendChild(cartItem);

        // Add event listeners for + and - buttons
        cartItem.querySelector('.plus').addEventListener('click', () => {
            item.quantity++;
            updateCart();
        });

        cartItem.querySelector('.minus').addEventListener('click', () => {
            item.quantity--;
            if (item.quantity === 0) {
                cart = cart.filter(cartItem => cartItem !== item);
            }
            updateCart();
        });
    });

    iconCartSpan.textContent = totalQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Load Cart from Memory
const loadCart = () => {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
};

// Attach Click Event to Buy Buttons
buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let name = button.dataset.name;
        let price = parseFloat(button.dataset.price);
        let image = button.dataset.image;
        
        addToCart(name, price, image);
        body.classList.add('showCart'); // Open cart when an item is added
    });
});

// Initialize
loadCart();
