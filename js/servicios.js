// Selección de elementos del DOM
const calendario = document.querySelector(".calendario"),
  date = document.querySelector(".date"),
  dayscalendariocontainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  irtoBtn = document.querySelector(".irto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventscalendariocontainer = document.querySelector(".events"),
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

// Inicializar calendario
function initcalendario() {
  date.innerHTML = `${months[month]} ${year}`;
  dayscalendariocontainer.innerHTML = "";

  let firstDay = new Date(year, month, 1);
  let lastDay = new Date(year, month + 1, 0);
  let prevLastDay = new Date(year, month, 0);
  let prevDays = prevLastDay.getDate();
  let lastDate = lastDay.getDate();
  let day = firstDay.getDay();
  let nextDays = 7 - lastDay.getDay() - 1;

  for (let x = day; x > 0; x--) {
    dayscalendariocontainer.innerHTML += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let eventClass = eventsArr.some(event => event.day === i && event.month === month + 1 && event.year === year) ? "event" : "";
    let dayClass = (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) ? "today active" : "";
    
    dayscalendariocontainer.innerHTML += `<div class="day ${eventClass} ${dayClass}">${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    dayscalendariocontainer.innerHTML += `<div class="day next-date">${j}</div>`;
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
      }
    });
  });
}

// Obtener día activo
function getActiveDay(date) {
  let selectedDate = new Date(year, month, date);
  eventDay.innerHTML = selectedDate.toLocaleDateString("es-ES", { weekday: "long" });
  eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

function updateEvents(date) {
  let events = eventsArr.find(event => event.day === date && event.month === month + 1 && event.year === year);

  eventscalendariocontainer.innerHTML = events ? events.events.map(e => `
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
function prevMonth() { month = month === 0 ? 11 : month - 1; year = month === 11 ? year - 1 : year; initcalendario(); }
function nextMonth() { month = month === 11 ? 0 : month + 1; year = month === 0 ? year + 1 : year; initcalendario(); }

// Botón "Hoy"
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initcalendario();
});

// Botón "Ir a"
irtoBtn.addEventListener("click", () => {
  let dateArr = dateInput.value.split("/");
  if (dateArr.length === 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
    month = dateArr[0] - 1;
    year = dateArr[1];
    initcalendario();
  } else alert("Formato incorrecto. Usa MM/YYYY");
});

// Abrir / cerrar formulario de citas
addEventBtn.addEventListener("click", () => addEventWrapper.classList.add("active"));
addEventCloseBtn.addEventListener("click", () => addEventWrapper.classList.remove("active"));

// Agregar cita
addEventSubmit.addEventListener("click", () => {
  let eventText = addEventText.value.trim(); 
  let eventTime = addEventTime.value.trim(); // Asegurar que se obtiene bien la hora

  if (!eventText || !eventTime) {
    alert("Por favor, complete todos los campos");
    return;
  }

  let newEvent = { title: eventText, time: eventTime };let existingEvent = eventsArr.find(event => 
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

  saveEvents(); // Guardar en localStorage
});

// Eliminar cita
eventscalendariocontainer.addEventListener("click", (e) => {
  if (e.target.closest(".event")) {
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
      saveEvents();
    }
  }
});

// Iniciar calendario
initcalendario();
