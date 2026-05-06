const navbuttom = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navBar.classList.toggle('show');
});

