// JavaScript Document

// Menu de sélection
document.getElementById("selection1").onclick = function() {
			location.href = "#section3";
		}

document.getElementById("selection2").onclick = function() {
	location.href = "#section4";
}

document.getElementById("selection3").onclick = function() {
	location.href = "#section5";
}

document.getElementById("selection4").onclick = function() {
	location.href = "#section5";
}

document.getElementById("selection5").onclick = function() {
	location.href = "#section5";
}


window.onload = function() {
    var elements = ["selection1", "selection2", "selection3", "selection4", "selection5"]; // Liste d'IDs d'éléments
    var images = ["images/selection-img1.jpg", "images/selection-img2.jpg", "images/selection-img3.jpg", "images/selection-img4.jpg", "images/selection-img5.jpg"]; // Liste d'URLs d'images

    for (var i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).onmouseover = (function(i) {
            return function() {
                document.getElementById('selection-img').src = images[i];
            }
        })(i);
    }
};


function logOut() {
    let text = "Êtes vous sûr de vouloir vous déconnecter?";
    if (confirm(text) == true) {
        validUser = false;
        validPass = false;
        window.location.href = "index.html";
    } 
}
