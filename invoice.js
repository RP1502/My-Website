
        document.getElementById("invoice-form").addEventListener("submit", function(event) {
            let name = document.getElementById("customer-name");
            let address = document.getElementById("customer-address");

            // Check if both fields are filled
            if (name.value.trim() === "" || address.value.trim() === "") {
                alert("Please enter your name and address before printing the invoice.");
                event.preventDefault(); // Stop form submission
            } else {
                printInvoice();
            }
        });





document.addEventListener("DOMContentLoaded", function () {
    const invoiceIdElement = document.getElementById("invoice-id");
    const invoiceDateElement = document.getElementById("invoice-date");
    const invoiceItemsElement = document.getElementById("invoice-items");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const subtotalAfterDiscountElement = document.getElementById("subtotal-after-discount");
    const taxElement = document.getElementById("tax");
    const totalAmountElement = document.getElementById("total-amount");
    const customerNameInput = document.getElementById("customer-name");
    const customerAddressInput = document.getElementById("customer-address");
    const printBtn = document.getElementById("print-btn");

    // Generate Invoice Number
    let invoiceId = localStorage.getItem("invoiceId") ? parseInt(localStorage.getItem("invoiceId")) + 1 : 100;
    localStorage.setItem("invoiceId", invoiceId);

    // Set Invoice Number & Date
    invoiceIdElement.innerText = invoiceId;
    invoiceDateElement.innerText = new Date().toLocaleDateString();

    // Retrieve Cart Data
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        invoiceItemsElement.innerHTML = "<tr><td colspan='4'>No items in the cart.</td></tr>";
        return;
    }

    let subtotal = 0;

    // Populate Invoice Table
    cart.forEach(item => {
        let total = item.price * item.quantity;
        subtotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>₹${total.toFixed(2)}</td>
        `;
        invoiceItemsElement.appendChild(row);
    });

    // Apply 10% Discount
    let discount = subtotal * 0.10;
    let subtotalAfterDiscount = subtotal - discount;

    // Apply 3% Tax
    let tax = subtotalAfterDiscount * 0.03;
    let totalAmount = subtotalAfterDiscount + tax;

    // Update Invoice Summary
    subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
    discountElement.innerText = `₹${discount.toFixed(2)}`;
    subtotalAfterDiscountElement.innerText = `₹${subtotalAfterDiscount.toFixed(2)}`;
    taxElement.innerText = `₹${tax.toFixed(2)}`;
    totalAmountElement.innerText = `₹${totalAmount.toFixed(2)}`;

    // Disable Print Button Initially
    printBtn.disabled = true;

    // Function to Validate Inputs and Show Messages
    function validateCustomerDetails() {
        let name = customerNameInput.value.trim();
        let address = customerAddressInput.value.trim();

        if (name === "") {
            customerNameInput.classList.add("error");
            customerNameInput.placeholder = "⚠ Please enter your name!";
        } else {
            customerNameInput.classList.remove("error");
        }

        if (address === "") {
            customerAddressInput.classList.add("error");
            customerAddressInput.placeholder = "⚠ Please enter your address!";
        } else {
            customerAddressInput.classList.remove("error");
        }

        // Enable button only if both fields are filled
        printBtn.disabled = name === "" || address === "";
    }

    // Add Event Listeners to Inputs
    customerNameInput.addEventListener("input", validateCustomerDetails);
    customerAddressInput.addEventListener("input", validateCustomerDetails);

    // Handle Print Button Click
    printBtn.addEventListener("click", function () {
        validateCustomerDetails();
        if (!printBtn.disabled) {
            printInvoice();
        }
    });
});

// Print Invoice Function
function printInvoice() {
    window.print();
}
