// Fonction pour récupérer l'information du cookie
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

// Fonction pour sauvegarder l'information dans le cookie
function saveCart(cart) {
    if (document.cookie && document.cookie.includes('cart=')) {
        document.cookie = `cart=${JSON.stringify(cart)}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Fonction de rendement des éléments du panier
function renderCheckout() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img width="150px" src="${item.productImage}" alt="${item.productName}">
            <h4>${item.productName}</h4>
            <p>Prix: <b>${item.productPrice}</b></p>
            <p>Quantité: <b>${item.quantity}</b></p>
        </div>
		<br>
		<br>
    `).join('');

    // Calculer le total (taxes, shipping etc...)
    const total = cart.reduce((acc, item) => acc + (parseFloat(item.productPrice.replace('$', '')) * item.quantity), 0);
	const totalShipping = total * 0.05;	
	const tax = (totalShipping + total) * 0.14975;
	const totalTaxed = total + totalShipping + tax;
	
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
	document.getElementById('checkoutShipping').textContent = `$${totalShipping.toFixed(2)}`;
	document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
	document.getElementById('checkoutTotalTaxed').textContent = `$${totalTaxed.toFixed(2)}`;
}

function processPayment() {
	
    window.location.href = "payment_gateway.html";
}

// Rendement des éléments du panier lors du chargement de la page
renderCheckout();

// Retourner à la page précédente
function changeCart() {
	window.location.href = "cart.html";
}


// Validation du formulaire
var forms = document.querySelectorAll('.needs-validation');

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener('submit', function (event) {
    // Validation personnalisée avec Regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !emailRegex.test(emailInput.value)) {
      emailInput.setCustomValidity('Please enter a valid email address.');
    } else {
      emailInput.setCustomValidity('');
    }


    // Vérifier la validité du formulaire après validation personnalisée
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
		window.location.href = "success.html";
	}
	  
	

    form.classList.add('was-validated');
  }, false);
});





