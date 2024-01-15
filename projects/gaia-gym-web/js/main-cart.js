
// Shopping cart functionality
$(document).ready(function() {
    // Initialize the cart when the page loads
    initializeCart();

    // Add to cart button click event
    $(".add-to-cart").on("click", function() {
        var product = $(this).closest(".product");
        var productId = product.data("product-id");
        var productName = product.find(".product-name").text(); 
        var productPrice = parseFloat(product.find(".product-price").text().replace("$", ""));

        addToCart(productId, productName, productPrice);
    });
});

function initializeCart() {
    // Check if a cart already exists in local storage
    var storedCart = localStorage.getItem("cart");

    if (!storedCart) {
        // If not, initialize the cart as an empty array
        var cart = [];

        // Save the empty cart in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}


function addToCart(productId, productName, productPrice) {
    var cart = JSON.parse(localStorage.getItem("cart"));

    // Check if the product is already in the cart
    var existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        // If the product is already in the cart, update its quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it as a new item
        var newProduct = {
            productId: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(newProduct);
    }

    // Save the updated cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart modal
    updateCartModal();
}

function updateCartModal() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var modalBody = $(".modal-body");
    var cartTotal = 0;

    // Clear the current cart items
    modalBody.empty();

    // Add each product to the cart modal
    cart.forEach(item => {
        var itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        modalBody.append(`
            <div class="cart-item">
                <img src="Images/Equipment/Winter-Sports/WS-${item.productId}.png" width="200px" alt="${item.name}">
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
                <input type="number" min="0" value="${item.quantity}" class="item-quantity" data-product-id="${item.productId}">
                <p class="item-total">$${itemTotal.toFixed(0)}</p>
                <!-- Delete button with data-product-id -->
                <button class="btn btn-danger btn-sm delete-btn delete-btn-bottom-left" data-product-id="${item.productId}">Delete</button>
            </div>
        `);
    });

    // Update the total amount
    $("#cartTotal").text(`$${cartTotal.toFixed(2)}`);
}

// Handle quantity change in the cart modal
$(document).on("change", ".item-quantity", function() {
    var productId = $(this).data("product-id");
    var newQuantity = parseInt($(this).val());
    var cart = JSON.parse(localStorage.getItem("cart"));

    var targetProduct = cart.find(item => item.productId === productId);
    targetProduct.quantity = newQuantity;

    // Save the updated cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart modal
    updateCartModal();
});

// Show the cart modal when the shopping cart icon is clicked
$(".cart-btn").on("click", function() {
    updateCartModal();
});
	

// Function to handle deleting a product from the cart
function deleteFromCart(productId) {
    var cart = JSON.parse(localStorage.getItem("cart"));

    // Find the index of the product in the cart
    var index = cart.findIndex(item => item.productId === productId);

    if (index !== -1) {
        // Remove the product from the cart array
        cart.splice(index, 1);

        // Save the updated cart in local storage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart modal
        updateCartModal();
    }
}

// Handle delete button click in the cart modal
$(document).on("click", ".delete-btn", function() {
    var productId = $(this).data("product-id");
    deleteFromCart(productId);
});
