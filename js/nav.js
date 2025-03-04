const currentPath = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.aBarra');

navLinks.forEach(link => {
    if (link.href.includes(currentPath)) {
        link.classList.add('active');

        switch (currentPath) {
            case "index.html":
                link.style.backgroundColor = "#bfb1b3";
                link.style.color = "#ffffff";
                break;
            case "perfil.html":
                link.style.backgroundColor = "#ffffff";
                link.style.color = "black";
                break;
            case "servicios.html":
                link.style.backgroundColor = "#EDD9E1";
                link.style.color = "black";
                break;
            case "productos.html":
                link.style.backgroundColor = "#ffffff";
                link.style.color = "black";
                break;
            case "nosotros.html":
                link.style.backgroundColor = "#BE6E87";
                link.style.color = "#FFFFFF";
                break;
            case "pagos.html":
                link.style.backgroundColor = "#FFFFFF";
                link.style.color = "black";
                break;
            case "contactenos.html":
                link.style.backgroundColor = "#FFFFFF";
                link.style.color = "black";
                break;
            case "inicioSesion.html":
                link.style.backgroundColor = "#F4F4F400";
                link.style.color = "#F4F4F400";
                break;

            default:
                link.style.backgroundColor = "#FFFFFF";
                link.style.color = "#B08EA2";

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