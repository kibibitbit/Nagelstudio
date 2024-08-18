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



