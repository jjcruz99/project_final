// Selección de elementos del DOM
const calendario = document.querySelector(".calendario"),
  date = document.querySelector(".date"),
  daysCalendarioContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  irtoBtn = document.querySelector(".irto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsCalendarioContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventText = document.getElementById("event-text"),
  addEventTime = document.getElementById("event-time"),
  addEventSubmit = document.querySelector(".add-event-btn");

// Variables de fecha
let today = new Date();
let activeDay = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

// Array de meses
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Array para almacenar eventos
let eventsArr = JSON.parse(localStorage.getItem("events")) || [];

// Función para formatear fecha
function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// Función para verificar disponibilidad
function isTimeAvailable(day, month, year, time) {
  const eventForDay = eventsArr.find(event => 
    event.day === day && 
    event.month === month + 1 && 
    event.year === year
  );
  
  if (!eventForDay) return true;
  
  // Verificar si ya existe una cita con la misma hora
  return !eventForDay.events.some(event => event.time === time);
}

// Inicializar calendario
function initCalendario() {
  date.innerHTML = `${months[month]} ${year}`;
  daysCalendarioContainer.innerHTML = "";

  let firstDay = new Date(year, month, 1);
  let lastDay = new Date(year, month + 1, 0);
  let prevLastDay = new Date(year, month, 0);
  let prevDays = prevLastDay.getDate();
  let lastDate = lastDay.getDate();
  let day = firstDay.getDay();
  let nextDays = 7 - lastDay.getDay() - 1;

  // Días del mes anterior
  for (let x = day; x > 0; x--) {
    daysCalendarioContainer.innerHTML += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Días del mes actual
  for (let i = 1; i <= lastDate; i++) {
    let eventClass = eventsArr.some(event => event.day === i && event.month === month + 1 && event.year === year) ? "event" : "";
    let dayClass = (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) ? "today active" : "";
    
    daysCalendarioContainer.innerHTML += `<div class="day ${eventClass} ${dayClass}">${i}</div>`;
  }

  // Días del mes siguiente
  for (let j = 1; j <= nextDays; j++) {
    daysCalendarioContainer.innerHTML += `<div class="day next-date">${j}</div>`;
  }

  addListner();
}

// Agregar eventos a los días
function addListner() {
  document.querySelectorAll(".day").forEach(day => {
    day.addEventListener("click", e => {
      if (e.target.classList.contains("prev-date")) prevMonth();
      else if (e.target.classList.contains("next-date")) nextMonth();
      else {
        document.querySelectorAll(".day").forEach(day => day.classList.remove("active"));
        e.target.classList.add("active");
        activeDay = Number(e.target.innerHTML);
        getActiveDay(activeDay);
        updateEvents(activeDay);
        
        // Si existe el elemento de selección de horas, actualizar su disponibilidad
        if (document.querySelector('.time-slots')) {
          updateTimeSlots();
        }
      }
    });
  });
}


// Actualizar los slots de tiempo disponibles
function updateTimeSlots() {
  const timeSlotsContainer = document.querySelector('.time-slots');
  if (!timeSlotsContainer) return;
  
  const timeSlots = Array.from(timeSlotsContainer.children);
  
  timeSlots.forEach(slot => {
    if (!isTimeAvailable(activeDay, month, year, slot.textContent.trim())) {
      slot.remove(); // Elimina los horarios no disponibles
    }
  });
}

// Iniciar calendario
initCalendario();

// Si existe la estructura del primer script, inicializar también
window.addEventListener('load', () => {
  if (document.querySelector('.time-slots')) {
    updateTimeSlots();
  }
});

// Obtener día activo
function getActiveDay(date) {
  let selectedDate = new Date(year, month, date);
  eventDay.innerHTML = selectedDate.toLocaleDateString("es-ES", { weekday: "long" });
  eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Actualizar eventos mostrados
function updateEvents(date) {
  let events = eventsArr.find(event => event.day === date && event.month === month + 1 && event.year === year);

  eventsCalendarioContainer.innerHTML = events ? events.events.map(e => `
    <div class="event" data-title="${e.title}" data-time="${e.time}">
      <div class="title">
        <i class="fas fa-circle"></i>
        <h3 class="event-title">${e.title}</h3>
      </div>
      <div class="event-time">
        <span>${e.time}</span>
      </div>
      <button class="delete-event">🗑</button>
    </div>`).join("") : `<div class="no-event"><h3>No tienes citas agendadas</h3></div>`;

  saveEvents(); // Guardar en localStorage
}

// Guardar eventos en localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Cambiar mes
function prevMonth() { 
  month = month === 0 ? 11 : month - 1; 
  year = month === 11 ? year - 1 : year; 
  initCalendario(); 
}

function nextMonth() { 
  month = month === 11 ? 0 : month + 1; 
  year = month === 0 ? year + 1 : year; 
  initCalendario(); 
}

// Botón "Hoy"
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  activeDay = today.getDate();
  initCalendario();
});

// Botón "Ir a"
irtoBtn.addEventListener("click", () => {
  let dateArr = dateInput.value.split("/");
  if (dateArr.length === 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
    month = dateArr[0] - 1;
    year = parseInt(dateArr[1]);
    initCalendario();
  } else alert("Formato incorrecto. Usa MM/YYYY");
});

// Abrir / cerrar formulario de citas
addEventBtn.addEventListener("click", () => addEventWrapper.classList.add("active"));
addEventCloseBtn.addEventListener("click", () => addEventWrapper.classList.remove("active"));

// Agregar cita
addEventSubmit.addEventListener("click", () => {
  let eventText = addEventText.value.trim(); 
  let eventTime = addEventTime.value.trim();

  if (!eventText || !eventTime) {
    alert("Por favor, complete todos los campos");
    return;
  }

  // Verificar si la hora está disponible
  if (!isTimeAvailable(activeDay, month, year, eventTime)) {
    alert("Esta hora ya no está disponible. Por favor, selecciona otra hora.");
    return;
  }

  let newEvent = { title: eventText, time: eventTime };
  let existingEvent = eventsArr.find(event => 
    event.day === activeDay && event.month === month + 1 && event.year === year
  );

  if (existingEvent) {
    existingEvent.events.push(newEvent);
  } else {
    eventsArr.push({ day: activeDay, month: month + 1, year, events: [newEvent] });
  }

  addEventWrapper.classList.remove("active"); // Cerrar formulario
  addEventText.value = ""; 
  addEventTime.value = ""; 

  updateEvents(activeDay); // Actualizar eventos
  document.querySelector(".day.active").classList.add("event");
  
  // Actualizar disponibilidad de franjas horarias si existe ese elemento
  if (document.querySelector('.time-slots')) {
    updateTimeSlots();
  }

  saveEvents(); // Guardar en localStorage
});

// Eliminar cita
eventsCalendarioContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-event") || e.target.closest(".delete-event")) {
    if (confirm("¿Seguro que quieres eliminar esta cita?")) {
      let eventEl = e.target.closest(".event");
      let eventText = eventEl.getAttribute("data-title");
      let eventTime = eventEl.getAttribute("data-time");

      eventsArr = eventsArr.map(event => {
        if (event.day === activeDay && event.month === month + 1 && event.year === year) {
          event.events = event.events.filter(ev => ev.title !== eventText || ev.time !== eventTime);
        }
        return event;
      }).filter(event => event.events.length > 0);

      updateEvents(activeDay);
      
      // Actualizar disponibilidad de franjas horarias si existe ese elemento
      if (document.querySelector('.time-slots')) {
        updateTimeSlots();
      }
      
      saveEvents();
    }
  }
});

// Gestión de selección de horarios (para integrar con el primer script)
if (document.querySelector('.time-slots')) {
  const timeSlots = document.querySelectorAll('.time-slot');
  
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      // Verificar si hay fecha seleccionada
      if (!activeDay) {
        alert('Por favor, selecciona primero una fecha');
        return;
      }

      // Verificar si el horario está disponible
      if (slot.classList.contains('unavailable')) {
        alert('Este horario no está disponible');
        return;
      }

      // Limpiar selección anterior
      timeSlots.forEach(s => s.classList.remove('selected'));
      
      // Actualizar selección
      slot.classList.add('selected');
      let selectedTime = slot.textContent.trim();

      // Abrir formulario o confirmar directamente
      if (document.querySelector('.add-event-wrapper')) {
        addEventWrapper.classList.add('active');
        addEventTime.value = selectedTime;
        // Enfocar el campo de texto para que el usuario solo tenga que ingresar el nombre de la cita
        addEventText.focus();
      } else {
        // Para el caso del primer script que confirmaba directamente
        const confirmacion = confirm(`¿Deseas confirmar tu cita para el ${new Date(year, month, activeDay).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} a las ${selectedTime}?`);

        if (confirmacion) {
          // Crear evento directamente
          let newEvent = { title: "Cita", time: selectedTime };
          let existingEvent = eventsArr.find(event => 
            event.day === activeDay && event.month === month + 1 && event.year === year
          );

          if (existingEvent) {
            existingEvent.events.push(newEvent);
          } else {
            eventsArr.push({ day: activeDay, month: month + 1, year, events: [newEvent] });
          }
          
          alert('¡Tu cita ha sido confirmada!');
          
          // Marcar horario como no disponible
          slot.classList.add('unavailable');
          
          // Actualizar eventos y guardar
          updateEvents(activeDay);
          saveEvents();
        } else {
          slot.classList.remove('selected');
        }
      }
    });
  });
}

// Iniciar calendario
initCalendario();

// Si existe la estructura del primer script, inicializar también
window.addEventListener('load', () => {
  if (document.querySelector('.time-slots')) {
    updateTimeSlots();
  }
});