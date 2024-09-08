const right = document.querySelector('.right');
const logo = document.querySelector('#logo');
const left = document.querySelector('.left');
const menuico = document.querySelector('.menu');
const menubar = document.querySelector('.menubar');
let isScrolled = false;
let ticking = false;

// Dynamically calculate the height of the header
const header = document.querySelector('header');
let specificHeight = header.offsetHeight; // Get header height
let headerPlaceholder = null;

// Adjust the height on window resize to handle responsiveness
window.addEventListener('resize', () => {
    specificHeight = header.offsetHeight;
});

menuico.addEventListener('click', () => {
    menuico.classList.toggle('menu-clicked');
    menubar.classList.toggle('menu-open');

    // Get the height of the fixed header and apply it to the menu
    const fixedMenubar = document.querySelector('.right.fixed');
    if (fixedMenubar) {
        const fixedHeight = getComputedStyle(fixedMenubar).height;
        menubar.style.top = fixedHeight;
    } else {
        menubar.style.top = 'auto';  // Reset top when it's not fixed
    }
});

window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});
const products = document.querySelectorAll('.products .product-container .product');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view'); // Add class when in view
            observer.unobserve(entry.target); // Stop observing once animation is applied
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is in view

products.forEach(product => {
    observer.observe(product); // Start observing each product
});
function handleScroll() {
    if (window.scrollY >= specificHeight && !isScrolled) {
        isScrolled = true;

        // Create a placeholder to prevent the jump effect
        if (!headerPlaceholder) {
            headerPlaceholder = document.createElement('div');
            headerPlaceholder.style.height = `${header.offsetHeight}px`;
            headerPlaceholder.style.width = '100%';
            header.parentNode.insertBefore(headerPlaceholder, header);
        }

        right.classList.add('fixed');
        logo.classList.add('small-logo');
        right.prepend(logo);  // Move the logo to the right section when scrolled
    } else if (window.scrollY < specificHeight && isScrolled) {
        isScrolled = false;

        // Remove the placeholder when the header returns to normal
        if (headerPlaceholder) {
            headerPlaceholder.remove();
            headerPlaceholder = null;
        }

        right.classList.remove('fixed');
        logo.classList.remove('small-logo');
        left.append(logo);  // Move the logo back to the left section
    }
}
