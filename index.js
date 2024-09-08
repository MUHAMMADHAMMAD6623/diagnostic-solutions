const right = document.querySelector('.right');
const logo = document.querySelector('#logo');
const left = document.querySelector('.left');
const menuico = document.querySelector('.menu');
const menubar = document.querySelector('.menubar');
const specificHeight = 132;
let isScrolled = false;
let ticking = false;

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

function handleScroll() {
    if (window.scrollY >= specificHeight && !isScrolled) {
        isScrolled = true;
        right.classList.add('fixed');
        logo.classList.add('small-logo');
        right.prepend(logo);  // Move the logo to the right section when scrolled
    } else if (window.scrollY < specificHeight && isScrolled) {
        isScrolled = false;
        right.classList.remove('fixed');
        logo.classList.remove('small-logo');
        left.append(logo);  // Move the logo back to the left section
    }
}
