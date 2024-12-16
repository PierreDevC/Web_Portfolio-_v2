// Fonction qui affichera une notification lors de l'ajout d'un article dans le panier
launchNotification = () => {
    let notification = document.getElementById("toast");
    notification.className = "show";
    setTimeout(() => { notification.className = notification.className.replace("show", ""); }, 4000);
};

// Prendre l'information du cookie quand la page load
let cart = getCart(); 

// Ajout des produits dans le panier en récupérant les valeurs HTML (produits uniques data-product-id)
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        let product = button.parentElement;
        let productImage = product.querySelector('img').getAttribute('src');
        let productId = product.getAttribute('data-product-id');
        let productName = product.querySelector('h2').innerText;
        let productPrice = product.querySelector('.product-price').innerText;
		let productStock = product.getAttribute('data-item-quantity');
        let quantity = 1; //Minimum 1 item dans le panier

        let existingProduct = cart.find(item => item.productId === productId);

        if(existingProduct) {
            existingProduct.quantity++; // augmenter la quantité si le produit existe déja
        } else {
            cart.push({ productImage, productId, productName, productPrice, productStock, quantity });
        }
        saveCart(cart); // Mise à jour du panier
        renderCart();
    });
});

// Rendement du panier 
function renderCart() {
    let modalBody = document.querySelector('.modal-body');
    let cartTotalElement = document.getElementById('cartTotal');

    // Calcul du prix total des produits (avant taxes)
    let totalPrice = cart.reduce((total, item) => total + (parseFloat(item.productPrice) * item.quantity), 0);
    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;

    modalBody.innerHTML = cart.map((item, index) => `
        <div class="product">
            <img width="250px" src="${item.productImage}">
            <h2>${item.productName}</h2>
            <p>${item.productPrice}</p>
			<p>En stock: ${item.productStock}</p>
            <p>Quantité: <button class="decrease-quantity" data-index="${index}">-</button>${item.quantity}<button class="increase-quantity" data-index="${index}">+</button></p>
            <button class="remove-from-cart" data-index="${index}">Retirer</button>
        </div>
    `).join('');

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
			if (cart[index].quantity > cart[index].productStock - 1) {
				alert("La quantité excède le stock disponible"); 
			} else {
			  cart[index].quantity++;
			}
            
            saveCart(cart); // Mise à jour du panier
            renderCart();
        });
    });

	// Réduire la quantité d'un produit dans le panier
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                saveCart(cart); // Mise à jour du panier
                renderCart();
            }
        });
    });

	// Effacer un produit du panier
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            cart.splice(index, 1);
            saveCart(cart); // Mise à jour du panier
            renderCart();
        });
    });

    $('#cartModal').modal('show');
}


// Fonction pour sauvegarder les données du panier dans les cookies en utilisant JSON stringfy (setCookie)
function saveCart(cartData) {
    if (document.cookie && document.cookie.includes('cart=')) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); // Expire dans 1 jour
        document.cookie = `cart=${JSON.stringify(cartData)}; expires=${expirationDate.toUTCString()}; path=/`;
    } else {
        localStorage.setItem('cart', JSON.stringify(cartData));
    }
}

// Prendre l'information du panier avec les cookies ou local storage (getCookie)
function getCart() {
    if (document.cookie && document.cookie.includes('cart=')) {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('cart='));
        if (cookieValue) {
            return JSON.parse(cookieValue.split('=')[1]);
        }
    } else {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
    return [];
}

function checkoutButton() {
    window.location.href = "cart.html";
}

// Event listener pour mettre à jour le cart lorsqu'on affiche le modal bootstrap
document.querySelector('.cart-button-style').addEventListener('click', () => {
    updateCartState();
});

// Mettre à jour le 'state' du panier
function updateCartState() {
    renderCart(); // Afficher le panier avec les données courantes
    // Montrer le modal avec jquery
    $('#cartModal').modal('show');
}
