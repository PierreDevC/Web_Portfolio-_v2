// JavaScript Document

	$(document).ready(function(){
  $("li").hide();
  })
	// Valider les identifiants
  function f1() {
       // Afficher menu
       $(document).ready(function(){
        $(".in").show();
        $(".out").hide();
        $(".date").hide();
        });
}

var validUser = false;
var validPass = false;

function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = ["userName", "abc321"];
    var user1 = ["user1", "banana123"];
    var user2 = ["user2", "apple123"];
    var user3 = ["user3", "orange123"];

    switch (username) {
      case user[0]:
        case user1[0]:
        case user2[0]:
        case user3[0]:
            validUser = true;
            break;
        default:
            validUser = false;
            break;
    }
    switch (password) {
      case user[1]:
        case user1[1]:
        case user2[1]:
        case user3[1]:
            validPass = true;
            break;
        default:
            validPass = false;
            break;
    }

    if (validUser == true && validPass == true) {
      // Identification réussie, affichage du menu et création du cookie
      alert("Bienvenue " + username)

      // Afficher menu
      $(document).ready(function(){
        $("li").show();
        $(".in").hide();
        $(".out").show();
        $(".welcome").text("Bienvenue " + username);
        $(".date").show();
        showDate();
        });
  } else {
      //Afficher un message d'erreur
      alert("Identifiants incorrects");
  }
}

// Bloquer readmore si l'utilisateur n'est pas connecté
    $(document).ready(function() {
  $("#readMore").on('click', function() {
      if (!validUser && !validPass ) {
        alert("Veuillez vous connecter pour accéder au contenu");
      } else {
        window.location.href = "presentation.html";
      }
      

      

  });
});

function logOut() {
    let text = "Êtes vous sûr de vouloir vous déconnecter?";
    if (confirm(text) == true) {
        validUser = false;
        validPass = false;
        location.reload();
    } 
}

function showDate() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    document.getElementById('date').innerHTML = now.toDateString() + ", " + hours + ":" + minutes;
}
