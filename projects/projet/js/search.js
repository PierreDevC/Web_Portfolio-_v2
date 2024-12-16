// JavaScript Document

let paintingNames = new Array("renedegas", "achilledegas", "selfportrait", "bazilleandcamille", "flowers", "mousme","bastille", "vangogh", "elizabeth", "rebecca");


let paintingCreators = new Array("Edgar Degas", "Edgar Degas", "Henri Fantin-Latour","Claude Monet", "Paul Cézanne", "Vincent Van Gogh", "Henri de Toulouse-Lautrec", "Vincent van Gogh", "Joseph Wright", "Charles Wilson Peale");


let paintingCollections = new Array("Impressionisme", "Impressionisme", "Impressionisme", "Impressionisme", "Post-Impressionisme", "Post-Impressionisme", "Post-Impressionisme", "Post-Impressionisme", "Réalisme", "Réalisme");


let paintingImages = new Array("images/products/product-1.jpg","images/products/product-2.jpg","images/products/product-3.jpg","images/products/product-4.jpg","images/products/product-5.jpg","images/products/product-6.jpg","images/products/product-7.jpg","images/products/product-8.jpg","images/products/product-9.jpg","images/products/product-10.jpg");


function displayPaintingInfo() {
	let userInput = document.getElementById("inputBox").value;
	let userInputLower = userInput.toLowerCase();
	let index = paintingNames.indexOf(userInputLower);
	if (index != -1) {
		let paintingNamesCapitalized = paintingNames[index].charAt(0).toUpperCase() + paintingNames[index].slice(1);
		document.getElementById("paintingName").innerHTML = paintingNamesCapitalized;
		document.getElementById("paintingCreator").innerHTML = paintingCreators[index];
		document.getElementById("paintingCollection").innerHTML = paintingCollections[index];
		document.getElementById("paintingImage").src = paintingImages[index];
	} else {
		alert("Entrez un mot-clé de peinture valide");
	}
}
