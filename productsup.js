function redirectToDetails(name, price, image, description) {
    const url = `product-details.html?name=${encodeURIComponent(name)}&price=${price}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`;
    window.location.href = url;
}

