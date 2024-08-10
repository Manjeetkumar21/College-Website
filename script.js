//Stats (For counting the values)
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + '<span>+</span>';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function startCountAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((statNumber) => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        animateValue(statNumber, 0, target, 2000);
    });
}

// Intersection Observer setup
const statsSection = document.getElementById('stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCountAnimation();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);


// Navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeNav = document.querySelector('.close-nav');

    navbarToggler.addEventListener('click', function() {
        mobileNav.classList.add('show');
    });

    closeNav.addEventListener('click', function() {
        mobileNav.classList.remove('show');
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && !navbarToggler.contains(event.target)) {
            mobileNav.classList.remove('show');
        }
    });
});