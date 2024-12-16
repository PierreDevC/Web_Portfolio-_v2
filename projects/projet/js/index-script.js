// JavaScript Document

// Initialisation du Swiper //
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });


// Collections //
// Ouvrir les Collections dans une nouvelle page // 
function openLink(link) {
    window.open(link, "_blank");
}

// Assigner l'image grâce à son ID
var image1 = document.getElementById("image1");
var image2 = document.getElementById("image2");
var image3 = document.getElementById("image3");
var image4 = document.getElementById("image4");

// Accéder aux 4 types de collections
image1.addEventListener("click", function() {
    LoginLock();
});

image2.addEventListener("click", function() {
  LoginLock();
});

image3.addEventListener("click", function() {
  LoginLock();
});

image4.addEventListener("click", function() {
  LoginLock();
});
