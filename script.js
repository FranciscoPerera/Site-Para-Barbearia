// Efeito quando rola a página (muda navbar)
window.addEventListener("scroll", function () {
    document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// Fecha menu no mobile ao clicar
const navLinks = document.querySelectorAll('.nav-link');
const menu = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
            new bootstrap.Collapse(menu).toggle();
        }
    });
});