const right = document.querySelector('.right');
const logo = document.querySelector('#logo');
const left = document.querySelector('.left');
const menuico = document.querySelector('.menu');
const menubar = document.querySelector('.menubar');

menuico.addEventListener('click', () => {
  menuico.classList.toggle('menu-clicked');
  menubar.classList.toggle('menu-open');
});

const specificHeight = 132;
let isScrolled = false;
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    // Only change layout once when scrolling past or below specificHeight
    if (window.scrollY >= specificHeight && !isScrolled) {
        isScrolled = true;
        right.classList.add('fixed');
        logo.classList.add('small-logo');
        right.prepend(logo);  // Move the logo to the right section
    } else if (window.scrollY < specificHeight && isScrolled) {
        isScrolled = false;
        right.classList.remove('fixed');
        logo.classList.remove('small-logo');
        left.append(logo);   // Move the logo back to the left section
    }
}

// Prevent jumping to top when clicking menu items
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});
