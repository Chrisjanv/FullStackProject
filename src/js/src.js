// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
    const navbarLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    // Function to show the home section and hide other sections
    function showHome() {
        sections.forEach(function (section) {
            section.style.display = "none";
        });
        document.getElementById("home").style.display = "block";
    }

    // Add event listener for the "Home" button
    const homeButton = document.getElementById("home-link");
    homeButton.addEventListener("click", function (event) {
        event.preventDefault();
        showHome();
    });

    // Add event listeners to other navbar links
    navbarLinks.forEach(function (link) {
        const targetId = link.getAttribute("href").substring(1);
        link.addEventListener("click", function (event) {
            event.preventDefault();
            sections.forEach(function (section) {
                section.style.display = "none";
            });
            document.getElementById(targetId).style.display = "block";
        });
    });

    // Show the default home section when the page loads
    showHome();
});

// Contact Form 
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const feedbackDiv = document.getElementById("feedback");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        fetch("src/php/contact.php", {
            method: "POST",
            body: new FormData(contactForm),
        })
            .then(response => response.text())
            .then(data => {
                feedbackDiv.innerHTML = data;
            })
            .catch(error => {
                feedbackDiv.innerHTML = "An error occurred while processing your request.";
            });
    });
});

// Gallery

// Make an AJAX request to get image paths from the server
fetch('src/php/get_images.php')
    .then(response => response.json())
    .then(data => {
        // Extract image paths from the response
        const imagePaths = data.imagePaths;

        // Display images in the gallery section
        const gallery = document.getElementById('gallery');
        imagePaths.forEach(path => {
            const image = document.createElement('img');
            image.src = path;
            image.classList.add('galleryImages'); // Add the class "galleryImages" to the image
            gallery.appendChild(image);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Function to fetch and display products
let data = [];
function fetchAndDisplayProducts() {
    // Send an AJAX request to your PHP script
    fetch('src/php/get_products.php')
        .then(response => response.json())
        .then(responseData => {
            data = responseData; // Store the response data in the data variable
            const productRow = document.getElementById('product-row');
            // Clear any existing products
            productRow.innerHTML = '';

            // Loop through the products and create Bootstrap cards to display them
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-lg-3 ';

                productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.pictures}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Size: ${product.size}</p>
                            <p class="card-text">Price: R${product.price}</p>
                            <button class="btn btn-primary buyButton" data-name="${product.name}">Buy</button>
                        </div>
                    </div>
                `;

                productRow.appendChild(productCard);
            });

            // Add event listeners to the "Buy" buttons
            const buyButtons = document.querySelectorAll('.buyButton');
            buyButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Function to add a product to the cart
function addToCart(event) {
    const productName = event.target.getAttribute('data-name');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the product in the data based on the product name
    const product = getProductName(productName);

    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        displayCart();
    }
}

// Function to get a product by its name
function getProductName(productName) {
    const product = data.find(product => product.name === productName);
    return product;
}

// Function to display the cart contents in the "cartBody" element
function displayCart() {
    const cartBody = document.getElementById('cartBody');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear any existing cart content
    cartBody.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${product.name} - R${product.price}</p>
        `;
        cartBody.appendChild(cartItem);
    });
}

// Add a click event listener to the "Shop" link
document.getElementById('shop-link').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the link

    // Toggle the display of the shop section and fetch products
    const shopDiv = document.getElementById('shop');
    if (shopDiv.style.display === 'none') {
        fetchAndDisplayProducts();
        shopDiv.style.display = 'block';
    } else {
        shopDiv.style.display = 'none';
    }
});

// Function to clear the cart from local storage
function clearCart() {
    localStorage.removeItem('cart');
    displayCart(); // Refresh the cart display to show an empty cart
}

// Add a click event listener to the "Clear Cart" button
document.getElementById('cartClearButton').addEventListener('click', clearCart);

// Display the cart when the page loads
displayCart();


