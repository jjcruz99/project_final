document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',  // Vista inicial de mes
        dateClick: function(info) {
            var selectedDate = info.dateStr;  // Obtiene la fecha seleccionada
            // Redirige a Calendly (sin agregar la fecha)
            window.open("https://calendly.com/katherinnecardenas16", '_blank');
        }
    });

    calendar.render();  // Renderiza el calendario
});