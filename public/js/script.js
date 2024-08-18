function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.gallery-slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const totalSlides = slides.length;
    let slideIndex = 0;

    function showSlide(index) {
        if (index >= totalSlides) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = totalSlides - 1;
        } else {
            slideIndex = index;
        }
        const offset = -slideIndex * 100; // Berechnet den Versatz für den Slider
        document.querySelector('.gallery-slider').style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    function prevSlide() {
        showSlide(slideIndex - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Timer für automatisches Swipen
    let autoSlideInterval = setInterval(nextSlide, 5000); // Wechsel alle 5 Sekunden

    // Optional: Stoppe die automatische Slide bei Hover
    document.querySelector('.gallery-container').addEventListener('mouseover', () => {
        clearInterval(autoSlideInterval);
    });

    // Starte den Timer wieder, wenn der Mauszeiger das Element verlässt
    document.querySelector('.gallery-container').addEventListener('mouseout', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    name = name + "=";
    for (let i = 0; i < cookiesArray.length; i++) {
        let c = cookiesArray[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    const userConsent = getCookie("userConsent");
    if (!userConsent) {
        document.getElementById("cookie-banner").style.display = "block";
    }
}

function handleSettings() {
    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("cookie-settings").style.display = "block";
}

document.getElementById("accept-all").onclick = function() {
    setCookie("userConsent", "all", 365);
    document.getElementById("cookie-banner").style.display = "none";
};

document.getElementById("accept-necessary").onclick = function() {
    setCookie("userConsent", "necessary", 365);
    document.getElementById("cookie-banner").style.display = "none";
};

document.getElementById("cookie-settings-btn").onclick = function() {
    handleSettings();
};

document.getElementById("save-settings").onclick = function() {
    const analytics = document.getElementById("analytics-cookies").checked ? "accepted" : "declined";
    const marketing = document.getElementById("marketing-cookies").checked ? "accepted" : "declined";
    setCookie("userConsent", `necessary;analytics=${analytics};marketing=${marketing}`, 365);
    document.getElementById("cookie-settings").style.display = "none";
};

checkCookie();


