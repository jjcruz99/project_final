const articulosContainer = document.querySelector('.articulos-container');
const articulosControlsContainer = document.querySelector('.articulos-controls');
const articulosItems = document.querySelectorAll('.articulos-item');


// El articulosItems es un obj similiar a un array, q contiene todos los elementos de manera individual
class Carousel {
    //Aqui se gesional el comportamiento del carrusel
  constructor(container, controlsContainer, items) {
    this.carouselContainer = container;
    this.controlsContainer = controlsContainer;
    this.items = [...items];
    this.addClickEventToItems();
  }

    // Método para agregar  clic en el banner
    addClickEventToItems() {
        // Seleccionamos todos los elementos 
        const items = this.carouselContainer.querySelectorAll('.articulos-item');
    
        // Agregamos un event listener a cada elemento del carrusel
        items.forEach(item => {
          item.addEventListener('click', (event) => {
            // Obsegun el data-url lo llamamos
            const url = event.target.getAttribute('data-url');
            
            // nos lleva a ella
            if (url) {
              window.location.href = url;
            }
          });
        });
      }

// actualiza 
  updateItems() {
    this.items.forEach((el, i) => {
      el.className = `articulos-item articulos-item-${i + 1}`;
    });
  }

  move(direction) {
    direction === 'prev' 
      ? this.items.unshift(this.items.pop()) 
      : this.items.push(this.items.shift());
    this.updateItems();
  }

  createControls() {
    this.controlsContainer.innerHTML = ['prev', 'next']
      .map(dir => `<button class="articulos-control ${dir}">${dir === 'prev' ? '❮' : '❯'}</button>`)
      .join('');
    this.addControlEvents();
  }

  addControlEvents() {
    this.controlsContainer.querySelectorAll('.articulos-control').forEach(btn => {
      btn.addEventListener('click', () => this.move(btn.classList.contains('prev') ? 'prev' : 'next'));
    });
  }

  // fullcalendar revisar ya gregar como bootstarp luego que hace la conexion con el backend


}


// Inicializa el carrusel
const carousel = new Carousel(articulosContainer, articulosControlsContainer, articulosItems);
carousel.createControls();
