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

// Fonction pour sauvegarder l'information dans le cookies
function saveCart(cart) {
    if (document.cookie && document.cookie.includes('cart=')) {
        document.cookie = `cart=${JSON.stringify(cart)}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Fonction pour générer les informations dans le cookie
function renderCheckout() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.productImage}" alt="${item.productName}">
            <h4>${item.productName}</h4>
            <p>Prix: <b>${item.productPrice}</b></p>
            <p>Quantité: <b>${item.quantity}</b></p>
        </div>
		<br>
		<br>
    `).join('');

    // Calcul du total (shipping + taxes etc...)
    const total = cart.reduce((acc, item) => acc + (parseFloat(item.productPrice.replace('$', '')) * item.quantity), 0);
	const totalShipping = total * 0.05;	
	const tax = (totalShipping + total) * 0.14975;
	const totalTaxed = total + totalShipping + tax;
	
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
	document.getElementById('checkoutShipping').textContent = `$${totalShipping.toFixed(2)}`;
	document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
	document.getElementById('checkoutTotalTaxed').textContent = `$${totalTaxed.toFixed(2)}`;
	
	
	//Array de billets/monnaie
	var billDenominations = [100, 50, 20, 10, 5, 2, 1, 0.25, 0.1, 0.05];

	// Algorithme qui calcule le nombre de billets nécessaires
	function calculateBills(totalAmount) {
		var bills = {};
		var remainingAmount = totalAmount;

		billDenominations.forEach(function(denomination) {
			if (remainingAmount >= denomination) {
				var numBills = Math.floor(remainingAmount / denomination) ;
				bills[denomination] = numBills;
				remainingAmount -= numBills * denomination;
			}
		});

		return bills;
	}

	// Function qui affichera les billets
	function displayBills(bills) {
		var container = $('#bills-container');
		container.empty();

		$.each(bills, function(denomination, numBills) {
			for (var i = 0; i < numBills; i++) {
				container.append('<img class="bill" src="images/bills/' + denomination + '.png" alt="$' + denomination + '" />');
			}
		});
	}

	var cartTotal = totalTaxed; // Prix total du panier
	var billsNeeded = calculateBills(cartTotal);
	displayBills(billsNeeded);
}

// Fonction pour aller à la page suivante (checkout)
function processPayment() {

    window.location.href = "checkout.html";
}

// Rendement des éléments du panier et des billets lors du chargement de la page
renderCheckout();

// Retourner à la page précédente
function changeCart() {
	window.location.href = "products.html";
}








