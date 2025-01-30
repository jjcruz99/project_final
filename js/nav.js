const currentPath = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.aBarra');

navLinks.forEach(link => {
    if (link.href.includes(currentPath)) {
        link.classList.add('active');

        switch (currentPath) {
            case "index.html":
                link.style.backgroundColor ="#B9D9E3";
                link.style.color = "#ffffff";
                break;
            case "perfil.html":
                link.style.backgroundColor = "#ffffff";
                link.style.color = "black";
                break;
            case "servicios.html":
                link.style.backgroundColor = "#0000FF";
                link.style.color = "#FFFFFF";
                break;
            case "productos.html":
                link.style.backgroundColor = "#ffffff";
                link.style.color = "black";
                break;
            case "nosotros.html":
                link.style.backgroundColor = "#b08ea2";
                link.style.color = "#FFFFFF";
                break;
            case "pagos.html":
                link.style.backgroundColor = "#800080";
                link.style.color = "#FFFFFF";
                break;
            case "contactenos.html":
                link.style.backgroundColor = "#e5e5e5";
                link.style.color = "black";
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