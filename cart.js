document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    // Retrieve cart from localStorage or set an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update totals
    const updateTotal = () => {
        let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
        totalElement.innerText = `₹${subtotal.toFixed(2)}`;
    };

    // Function to render cart items
    const renderCartItems = () => {
        cartContainer.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            updateTotal();
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-details">
                    <h2 class="product-name">${item.name}</h2>
                    <p class="product-price">₹${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
                    </div>
                </div>
                <p class="item-total">₹${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        updateTotal();
    };

    // Event listener for quantity buttons
    cartContainer.addEventListener("click", (event) => {
        const button = event.target;
        const index = button.dataset.index;

        if (button.classList.contains("quantity-btn")) {
            const action = button.dataset.action;

            if (action === "increase") {
                cart[index].quantity += 1;
            } else if (action === "decrease" && cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            }

            localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
            renderCartItems();
        }
    });

    // Event listener for quantity input changes
    cartContainer.addEventListener("input", (event) => {
        const input = event.target;
        if (input.classList.contains("quantity")) {
            const index = input.dataset.index;
            const quantity = Math.max(1, parseInt(input.value, 10)); // Ensure minimum 1
            cart[index].quantity = quantity;

            localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
            renderCartItems();
        }
    });

    // Event listener for remove buttons
    cartContainer.addEventListener("click", (event) => {
        const button = event.target;
        if (button.classList.contains("remove-item")) {
            const index = button.dataset.index;
            cart.splice(index, 1); // Remove item from cart

            localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
            renderCartItems();
        }
    });

    // Render items initially
    renderCartItems();

    
});
