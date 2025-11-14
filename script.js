// ===================================
// MENÚ HAMBURGUESA
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Toggle menú
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevenir scroll cuando el menú está abierto en móvil
            if (window.innerWidth <= 768) {
                body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
            }
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
    
    // Cerrar menú al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
    
    // Manejar scroll para header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra al header cuando se hace scroll
        if (currentScroll > 0) {
            header.style.boxShadow = '0 4px 30px rgba(227, 6, 19, 0.4)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(227, 6, 19, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
});

// ===================================
// ANIMACIONES DE SCROLL
// ===================================

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.character-card, .season-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===================================
// VALIDACIÓN DE FORMULARIO
// ===================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const comentario = document.getElementById('comentario').value.trim();
        
        // Validación básica
        if (nombre === '' || email === '' || comentario === '') {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        // Si todo está bien, mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// ===================================
// ACCESIBILIDAD - NAVEGACIÓN CON TECLADO
// ===================================

document.addEventListener('keydown', function(e) {
    // Cerrar menú con ESC
    if (e.key === 'Escape') {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            menuToggle.focus();
        }
    }
});
