const burgerButton = document.querySelector('.burger-button');
const anyWhere = document.querySelector('body');
const navBurgerMenu = document.querySelector('.nav-ul');
const profile = document.getElementById('profile-svg');

navBurgerMenu.classList.add('nav-burger-menu-invisible');

burgerButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    menuShowHide();
})

navBurgerMenu.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    menuShowHide();
})

profile.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
})

anyWhere.addEventListener('click', (e) => {
    if (burgerButton.classList.contains('cross-button')) {
        menuShowHide();
    }
})

function menuShowHide() {
    burgerButton.classList.toggle('burger-button');
    burgerButton.classList.toggle('cross-button');
    navBurgerMenu.classList.toggle('nav-burger-menu-visible');
    navBurgerMenu.classList.toggle('nav-burger-menu-invisible');
}
