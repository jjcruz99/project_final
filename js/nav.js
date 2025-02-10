const currentPath = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.aBarra');

navLinks.forEach(link => {
    if (link.href.includes(currentPath)) {
        link.classList.add('active');

        switch (currentPath) {
            case "index.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";
                break;
            case "perfil.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffffk";
                break;
            case "servicios.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";
                break;
            case "productos.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";
                break;
            case "nosotros.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";
                break;
            case "pagos.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";
                break;
            case "contactenos.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";
                break;
            case "inicioSesion.html":
                link.style.backgroundColor = "#F4F4F400";
                link.style.color = "#F4F4F400";
                break;

            default:
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#ffffff";

        }
    }
});

const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');
const activePage = document.getElementById("activePage");

navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('show');

    if (window.innerWidth <= 768) {
        if (navLinksContainer.classList.contains("show")) {
            activePage.style.display = 'none';
        } else {
            activePage.style.display = 'block';
        }
    }
});