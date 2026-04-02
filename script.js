// ============================================
// Empire24Records - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Loading Screen
    // ============================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
    
    // Fallback: hide loader after 3 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);
    
    // ============================================
    // Custom Cursor
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .beat-card, .service-card, .artist-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }
    
    // ============================================
    // Navigation
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        updateActiveNavLink();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ============================================
    // Beat Filters
    // ============================================
    const beatFilters = document.querySelectorAll('.beat-filter');
    const beatCards = document.querySelectorAll('.beat-card');
    
    beatFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            beatFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            beatCards.forEach(card => {
                const genre = card.getAttribute('data-genre');
                if (filterValue === 'all' || genre === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ============================================
    // Audio Player - Folder based
    // ============================================
    let currentAudio = null;
    let currentButton = null;
    let currentCard = null;
    
    const beatPlayButtons = document.querySelectorAll('.btn-beat-play');
    
    beatPlayButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.beat-card');
            const audioFolder = card.getAttribute('data-audio');
            const icon = this.querySelector('i');
            
            // If clicking same playing button, pause it
            if (currentCard === card && currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                this.style.background = '';
                currentAudio = null;
                currentButton = null;
                currentCard = null;
                return;
            }
            
            // Stop current audio
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentButton) {
                    currentButton.querySelector('i').classList.remove('fa-pause');
                    currentButton.querySelector('i').classList.add('fa-play');
                    currentButton.style.background = '';
                }
            }
            
            if (!audioFolder) {
                showNotification('error', 'Audio non disponibile per questo beat.');
                return;
            }
            
            // Try multiple possible MP3 filenames in the folder
            const possibleFiles = [
                audioFolder + 'beat.mp3',
                audioFolder + 'audio.mp3',
                audioFolder + 'track.mp3',
                audioFolder + 'preview.mp3',
                audioFolder + 'song.mp3',
            ];
            
            let fileIndex = 0;
            currentAudio = new Audio(possibleFiles[0]);
            currentButton = this;
            currentCard = card;
            
            function tryNextFile() {
                fileIndex++;
                if (fileIndex < possibleFiles.length) {
                    currentAudio = new Audio(possibleFiles[fileIndex]);
                    setupAudioEvents();
                    currentAudio.play().catch(tryNextFile);
                } else {
                    showNotification('error', 'Aggiungi un file .mp3 nella cartella ' + audioFolder + ' (nomi accettati: beat.mp3, audio.mp3, track.mp3, preview.mp3, song.mp3)');
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    btn.style.background = '';
                    currentAudio = null;
                    currentButton = null;
                    currentCard = null;
                }
            }
            
            function setupAudioEvents() {
                currentAudio.addEventListener('play', () => {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    btn.style.background = 'var(--neon-purple)';
                });
                
                currentAudio.addEventListener('ended', () => {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    btn.style.background = '';
                    currentAudio = null;
                    currentButton = null;
                    currentCard = null;
                });
                
                currentAudio.addEventListener('error', tryNextFile);
            }
            
            setupAudioEvents();
            currentAudio.play().catch(tryNextFile);
        });
    });
    
    // ============================================
    // Beat Buy Buttons
    // ============================================
    const beatBuyButtons = document.querySelectorAll('.btn-beat-buy');
    
    beatBuyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.beat-card');
            const beatName = card.querySelector('h4').textContent;
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const subjectSelect = document.getElementById('subject');
                    if (subjectSelect) subjectSelect.value = 'beat';
                    const messageTextarea = document.getElementById('message');
                    if (messageTextarea) {
                        messageTextarea.value = `Ciao! Sono interessato al beat "${beatName}". Vorrei maggiori informazioni sull'acquisto.`;
                    }
                }, 800);
            }
        });
    });
    
    // ============================================
    // Contact Form
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (!data.name || !data.email || !data.message) {
                showNotification('error', 'Per favore, compila tutti i campi obbligatori.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('error', 'Per favore, inserisci un indirizzo email valido.');
                return;
            }
            
            const formAction = this.getAttribute('action');
            if (formAction.includes('YOUR_FORM_ID')) {
                showNotification('error', '⚠️ Formspree non configurato!');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
            submitBtn.disabled = true;
            
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
                    submitBtn.style.background = 'var(--neon-green)';
                    showNotification('success', 'Grazie per averci contattato!');
                    this.reset();
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    showNotification('error', 'Errore nell\'invio.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                showNotification('error', 'Errore di connessione.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // ============================================
    // Notification System
    // ============================================
    function showNotification(type, message) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <p>${message}</p>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed; top: 100px; right: 20px; z-index: 10000;
            background: ${type === 'success' ? 'var(--neon-green)' : '#f44336'};
            color: ${type === 'success' ? 'var(--black)' : 'white'};
            padding: 15px 25px; border-radius: 10px; max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
                .notification-content { display: flex; align-items: center; gap: 10px; }
                .notification-content i { font-size: 1.5rem; }
                .notification-content p { flex: 1; margin: 0; }
                .notification-close { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 5px; color: inherit; }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ============================================
    // Scroll Animations
    // ============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.beat-card, .service-card, .artist-card, .value-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(animationStyle);
    
    console.log('%c👑 EMPIRE24RECORDS', 'font-size: 24px; font-weight: bold; color: #9B59B6; background: #000; padding: 10px;');
    console.log('%cIndependent Sound. Empire Mindset.', 'font-size: 14px; color: #39FF14;');
});