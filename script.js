// Navigation mobile - Version améliorée
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const html = document.documentElement;

    if (!hamburger || !navLinks) return;

    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Bloquer le défilement lorsque le menu est ouvert
        html.style.overflow = isActive ? 'hidden' : '';
    };

    // Gestionnaire d'événement optimisé
    hamburger.addEventListener('click', toggleMenu);

    // Fermer le menu au clic sur un lien (délégation d'événement)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-links a')) {
            toggleMenu();
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            toggleMenu();
        }
    });
};

// Gestion du thème - Version améliorée
const initThemeSwitcher = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    // Icônes dynamiques
    const icons = {
        light: '<i class="fas fa-moon" aria-hidden="true"></i>',
        dark: '<i class="fas fa-sun" aria-hidden="true"></i>'
    };

    // Appliquer le thème
    const applyTheme = (isDark) => {
        html.classList.toggle('dark', isDark);
        themeToggle.innerHTML = isDark ? icons.dark : icons.light;
        themeToggle.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Vérifier le thème sauvegardé ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    applyTheme(initialTheme);

    // Basculer le thème
    themeToggle.addEventListener('click', () => {
        const isDark = !html.classList.contains('dark');
        applyTheme(isDark);
    });

    // Écouter les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
};

// Animations au scroll - Version améliorée
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Arrêter d'observer après l'animation
            }
        });
    }, observerOptions);

    // Éléments à animer
    const animatableElements = document.querySelectorAll(
        '.feature-card, .service-card, .team-card, .value-card, .section-header'
    );

    animatableElements.forEach(el => {
        observer.observe(el);
    });
};

// Onglets services - Version améliorée
const initServiceTabs = () => {
    const tabContainer = document.querySelector('.service-tabs-container');
    if (!tabContainer) return;

    const tabBtns = tabContainer.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    const switchTab = (tabId) => {
        // Mettre à jour les boutons
        tabBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-tab') === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        // Mettre à jour les contenus
        tabContents.forEach(content => {
            const isActive = content.id === tabId;
            content.classList.toggle('active', isActive);
            content.setAttribute('aria-hidden', !isActive);
        });
    };

    // Gestion des clics
    tabContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.tab-btn');
        if (!tabBtn) return;

        const tabId = tabBtn.getAttribute('data-tab');
        switchTab(tabId);
    });

    // Activer le premier onglet par défaut
    if (tabBtns.length > 0) {
        switchTab(tabBtns[0].getAttribute('data-tab'));
    }

    // Navigation au clavier
    tabContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const currentBtn = tabContainer.querySelector('.tab-btn.active');
            let index = Array.from(tabBtns).indexOf(currentBtn);
            
            if (e.key === 'ArrowLeft') index = (index - 1 + tabBtns.length) % tabBtns.length;
            if (e.key === 'ArrowRight') index = (index + 1) % tabBtns.length;
            
            tabBtns[index].focus();
            switchTab(tabBtns[index].getAttribute('data-tab'));
        }
    });
};

// Effet de scroll sur la navbar - Version améliorée
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
            
            // Masquer la navbar au défilement vers le bas
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    };

    // Délai pour optimiser les performances
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(handleScroll);
    });
};

// Animation des formes dans le hero - Version améliorée
const initShapeAnimations = () => {
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length === 0) return;

    let animationFrameId;
    const sensitivity = 0.05;
    const maxMovement = 20;

    const moveShapes = (e) => {
        cancelAnimationFrame(animationFrameId);
        
        animationFrameId = requestAnimationFrame(() => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = e ? e.clientX : centerX;
            const mouseY = e ? e.clientY : centerY;
            
            const normalizedX = (mouseX - centerX) / centerX;
            const normalizedY = (mouseY - centerY) / centerY;
            
            shapes.forEach((shape, index) => {
                const speed = index + 1;
                const moveX = normalizedX * maxMovement * speed * sensitivity;
                const moveY = normalizedY * maxMovement * speed * sensitivity;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    };

    // Animation initiale au centre
    moveShapes();

    // Écouter les mouvements de souris avec throttling
    window.addEventListener('mousemove', moveShapes);

    // Nettoyer à la désactivation
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', moveShapes);
    };
};

// Validation du formulaire - Version améliorée
const initContactForm = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const validateField = (field) => {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling;
        
        if (field.required && !value) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = 'Ce champ est obligatoire';
            return false;
        }
        
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = 'Veuillez entrer un email valide';
            return false;
        }
        
        field.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
        return true;
    };

    const validateForm = () => {
        let isValid = true;
        const fields = contactForm.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    };

    // Validation en temps réel
    contactForm.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            validateField(e.target);
        }
    });

    // Soumission du formulaire
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                // Simuler l'envoi (remplacer par un vrai fetch)
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoi en cours...';
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Afficher un message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Merci pour votre message! Nous vous contacterons bientôt.';
                contactForm.prepend(successMessage);
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Supprimer le message après 5s
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer plus tard.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
};

// Initialiser tous les composants
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeSwitcher();
    initScrollAnimations();
    initServiceTabs();
    initNavbarScroll();
    const cleanupShapes = initShapeAnimations();
    initContactForm();

    // Nettoyage éventuel
    window.addEventListener('beforeunload', () => {
        if (cleanupShapes) cleanupShapes();
    });
});

// Chargement progressif des images
if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback avec IntersectionObserver
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                lazyObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyObserver.observe(img);
    });
      }
