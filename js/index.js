const nav = document.getElementById("nav");

let lastScrollY = window.scrollY;
let lastDirection = null;
let ticking = false;
const visibilityThreshold = 100; // koliko se mora skrolovati da se reaguje
const backgroundThreshold = 50; // kada da se doda pozadina

function updateNav() {
    // Na početku funkcije updateNav
    if (window.innerWidth <= 991) {
        nav.classList.remove("hidden");
        nav.classList.add("scrolled"); // osigurava background
        return;
    }

    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    // Dodaj pozadinu ako skrol > backgroundThreshold
    if (currentScrollY > backgroundThreshold) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

    // Samo ako je razlika skrola veća od localnog praga
    if (Math.abs(diff) > visibilityThreshold) {
        if (diff > 0 && lastDirection !== "down") {
            // Skrol nadole
            nav.classList.add("hidden");
            lastDirection = "down";
        } else if (diff < 0 && lastDirection !== "up") {
            // Skrol nagore
            nav.classList.remove("hidden");
            lastDirection = "up";
        }
        lastScrollY = currentScrollY;
    }

    ticking = false;
}

window.addEventListener("scroll", function () {
    if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
    }
});