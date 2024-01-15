document.addEventListener("DOMContentLoaded", function () {
    // Function to get the cart data from local storage
    function getCartData() {
        var cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    }

    // Function to create HTML elements for each cart item
    function createCartItemElement(item) {
        var cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("shopping-cart");

        var productImage = document.createElement("img");
        productImage.src = "images/shop/shoe" + item.productId + ".jpg";
        productImage.width = 300;
        productImage.alt = item.name;

        var productName = document.createElement("p");
        productName.classList.add("product-name");
        productName.textContent = item.name;

        var productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = "$" + item.price.toFixed(2);

        var productQuantity = document.createElement("p");
        productQuantity.classList.add("product-quantity");
        productQuantity.textContent = "Quantity: " + item.quantity;

        cartItemDiv.appendChild(productImage);
        cartItemDiv.appendChild(productName);
        cartItemDiv.appendChild(productPrice);
        cartItemDiv.appendChild(productQuantity);

        return cartItemDiv;
    }

    // Function to display the cart items in the checkout page
    function displayCartItems() {
        var cart = getCartData();
        var elementContainer = document.querySelector(".element-container");
        var totalAmount = 0;

        // Clear any existing cart items
        elementContainer.innerHTML = "";

        // Add cart items to the checkout page and calculate total price
        cart.forEach(function (item) {
            var cartItemElement = createCartItemElement(item);
            elementContainer.appendChild(cartItemElement);

            totalAmount += item.price * item.quantity;
        });

        // Create and append total price element
        var totalElement = document.createElement("p");
        totalElement.classList.add("total-price");
        totalElement.textContent = "Total: $" + totalAmount.toFixed(2);
        elementContainer.appendChild(totalElement);
    }

    // Call the function to display the cart items when the page loads
    displayCartItems();

    // ... (previous code)

    // Shopping cart functionality
    // ... (previous code)

    // Function to handle deleting a product from the cart
    // ... (previous code)

    // Handle delete button click in the cart modal
    // ... (previous code)
});
