// Shop

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let itemsForSale = [];
fetch('/src/json/clothing.json')
    .then(response => response.json())
    .then(data => {

        itemsForSale = data;
        console.log(itemsForSale);
        let shopPage = document.getElementById('shopPage');

        // loop through the clothing items and create elements for each item
        data.clothing.forEach(item => {

            shopPage.classList.add('row');

            // create a div to hold the item
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.classList.add('col-m-12');
            itemDiv.classList.add('col-sm-4');

            // create an image element for the item
            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.name;
            image.classList.add('img-fluid');
            itemDiv.appendChild(image);

            // create a heading element for the item name
            const name = document.createElement('h3');
            name.textContent = item.name;
            itemDiv.appendChild(name);

            // create a paragraph element for the item price
            const price = document.createElement('p');
            price.textContent = 'R' + item.price.toFixed(2);
            itemDiv.appendChild(price);

            const buyBtn = document.createElement('div');
            buyBtn.classList.add('btn');
            buyBtn.textContent = 'Buy';
            itemDiv.appendChild(buyBtn);

            buyBtn.addEventListener('click', () => {
                addToCart(item);
            });

            const clearCartButton = document.getElementById("clearCartButton");
            clearCartButton.addEventListener('click', () => {
                clearCart();
            });

            // add the item to the shopPage
            shopPage.appendChild(itemDiv);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            displayCart(cart);
            cartAmount();
        });
    })

    .catch(error => {
        console.error('Error fetching JSON data: ', error);

    });

// CART
// Add to cart function
function addToCart(item) {
    class Cart {
        constructor(product, price) {
            this.product = product;
            this.price = price;
        }
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // create a new cart object
    let cartItem = new Cart(item.name, item.price);

    // add the cart object to the cart array
    cart.push(cartItem);

    // save the updated cart array to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart(cart);
    cartAmount();
}

function clearCart() {
    if (localStorage.getItem('cart')) {
        localStorage.removeItem('cart');
        console.log('Cart has been cleared!');
        displayCart([]);
        cartAmount();
    } else {
        console.log('Cart is already empty!');
    }
}

function displayCart(cart) {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = '';

    if (cart.length === 0) {
        cartBody.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const table = document.createElement('table');
        table.classList.add('table');
        table.classList.add('table-striped');

        // Create table header
        const header = document.createElement('tr');
        const productHeader = document.createElement('th');
        productHeader.textContent = 'Product';
        const priceHeader = document.createElement('th');
        priceHeader.textContent = 'Price';
        header.appendChild(productHeader);
        header.appendChild(priceHeader);
        table.appendChild(header);

        // Add table rows for each item in the cart
        cart.forEach(item => {
            const row = document.createElement('tr');
            const product = document.createElement('td');
            product.textContent = item.product;
            const price = document.createElement('td');
            price.textContent = 'R' + item.price.toFixed(2);
            row.appendChild(product);
            row.appendChild(price);
            table.appendChild(row);
        });

        // Add table to the cart body
        cartBody.appendChild(table);
    }
}

function cartAmount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let amount = cart.length;
    let cartAmount = document.getElementById('cart');
    cartAmount.textContent = `Cart (${amount})`;
}