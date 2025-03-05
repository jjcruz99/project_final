
document.addEventListener('DOMContentLoaded', function() {
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonial-control.prev');
    const testimonialNext = document.querySelector('.testimonial-control.next');
    let testimonialIndex = 0;

    function moveTestimonials(direction) {
        const cardWidth = testimonialCards[0].offsetWidth + 32; 
        testimonialIndex = direction === 'next' 
            ? Math.min(testimonialIndex + 1, testimonialCards.length - 1)
            : Math.max(testimonialIndex - 1, 0);
        
        testimonialContainer.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
    }

    testimonialPrev.addEventListener('click', () => moveTestimonials('prev'));
    testimonialNext.addEventListener('click', () => moveTestimonials('next'));
});