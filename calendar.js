// calendar.js - JavaScript untuk Halaman Kalender Interaktif

// ========== VARIABEL GLOBAL ==========
const calendarPage = document.getElementById('calendar-page');
const revealPage = document.getElementById('reveal-page');
const calendarGrid = document.getElementById('calendar-grid');
const specialDate = document.getElementById('date-5');
const backCalendarBtn = document.getElementById('back-calendar-btn');
const promiseBtn = document.getElementById('promise-btn');
const revealMessage = document.getElementById('reveal-message');
const heartParticles = document.getElementById('heart-particles');
const dateFocus = document.getElementById('date-focus');
const body = document.body;

// Kursor variables
let trailDots = [];
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorHeart = null;
let cursorTrail = null;

// ========== FUNGSI INISIALISASI KURSOR ==========
function initHeartCursor() {
    // Cek apakah elemen kursor sudah ada
    cursorHeart = document.querySelector('.cursor-heart');
    cursorTrail = document.querySelector('.cursor-trail');
    
    // Jika tidak ada, buat elemen kursor baru
    if (!cursorHeart) {
        cursorHeart = document.createElement('div');
        cursorHeart.className = 'cursor-heart';
        cursorHeart.innerHTML = '💖';
        document.body.appendChild(cursorHeart);
    }
    
    if (!cursorTrail) {
        cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);
    }
    
    // Update posisi kursor
    document.addEventListener('mousemove', handleMouseMove);
    
    // Efek hover pada elemen interaktif
    const interactiveElements = document.querySelectorAll('button, .date-cell, .card, .action-btn, a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Efek klik pada kursor
    document.addEventListener('click', handleClick);
    
    // Tampilkan kursor custom
    cursorHeart.style.display = 'block';
    cursorTrail.style.display = 'block';
    
    // Sembunyikan kursor default
    document.body.style.cursor = 'none';
}

function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update posisi kursor utama dengan sedikit delay untuk efek smooth
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    if (cursorHeart) {
        cursorHeart.style.left = `${cursorX}px`;
        cursorHeart.style.top = `${cursorY}px`;
    }
    
    if (cursorTrail) {
        cursorTrail.style.left = `${mouseX}px`;
        cursorTrail.style.top = `${mouseY}px`;
    }
    
    // Buat trail dots
    createTrailDot(mouseX, mouseY);
}

function handleMouseEnter() {
    if (cursorHeart) {
        cursorHeart.style.fontSize = '32px';
        cursorHeart.style.color = '#ff3366';
        cursorHeart.style.textShadow = '0 0 15px rgba(255, 51, 102, 0.8)';
    }
    
    if (cursorTrail) {
        cursorTrail.style.width = '20px';
        cursorTrail.style.height = '20px';
        cursorTrail.style.background = 'rgba(255, 107, 139, 0.7)';
    }
}

function handleMouseLeave() {
    if (cursorHeart) {
        cursorHeart.style.fontSize = '24px';
        cursorHeart.style.color = '#ff6b8b';
        cursorHeart.style.textShadow = '0 0 10px rgba(255, 107, 139, 0.7)';
    }
    
    if (cursorTrail) {
        cursorTrail.style.width = '12px';
        cursorTrail.style.height = '12px';
        cursorTrail.style.background = 'rgba(255, 107, 139, 0.4)';
    }
}

function handleClick(e) {
    // Efek klik pada kursor
    if (cursorHeart) {
        cursorHeart.classList.add('cursor-click');
        setTimeout(() => {
            cursorHeart.classList.remove('cursor-click');
        }, 300);
    }
    
    // Tambahkan efek ledakan kecil di titik klik
    createClickEffect(e.clientX, e.clientY);
}

function createTrailDot(x, y) {
    const trailDot = document.createElement('div');
    trailDot.className = 'trail-dot';
    
    // Random size
    const size = 4 + Math.random() * 8;
    trailDot.style.width = `${size}px`;
    trailDot.style.height = `${size}px`;
    
    // Random color variation
    const colors = [
        'rgba(255, 107, 139, 0.6)',
        'rgba(255, 182, 193, 0.6)',
        'rgba(255, 105, 180, 0.6)',
        'rgba(255, 20, 147, 0.6)'
    ];
    trailDot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Set position
    trailDot.style.left = `${x}px`;
    trailDot.style.top = `${y}px`;
    
    // Add to body
    document.body.appendChild(trailDot);
    
    // Remove after animation
    setTimeout(() => {
        if (trailDot.parentNode) {
            trailDot.parentNode.removeChild(trailDot);
        }
    }, 500);
    
    // Store reference
    trailDots.push(trailDot);
    
    // Clean up old dots (keep array manageable)
    if (trailDots.length > 20) {
        const oldDot = trailDots.shift();
        if (oldDot && oldDot.parentNode) {
            oldDot.parentNode.removeChild(oldDot);
        }
    }
}

function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.width = '0';
    effect.style.height = '0';
    effect.style.borderRadius = '50%';
    effect.style.background = 'radial-gradient(circle, rgba(255,107,139,0.8) 0%, rgba(255,107,139,0) 70%)';
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.zIndex = '9996';
    effect.style.pointerEvents = 'none';
    
    document.body.appendChild(effect);
    
    // Animate
    let size = 0;
    const maxSize = 50;
    const growSpeed = 5;
    
    function animateEffect() {
        size += growSpeed;
        effect.style.width = `${size}px`;
        effect.style.height = `${size}px`;
        effect.style.opacity = `${1 - size / maxSize}`;
        
        if (size < maxSize) {
            requestAnimationFrame(animateEffect);
        } else {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }
    }
    
    animateEffect();
}

// ========== FUNGSI UTAMA KALENDER ==========
function handleSpecialDateClick() {
    // Fade out other dates
    const allDates = document.querySelectorAll('.date-cell:not(.special-date):not(.empty)');
    allDates.forEach(date => {
        date.style.opacity = '0.3';
        date.style.filter = 'blur(2px)';
        date.style.transition = 'all 0.8s ease';
    });
    
    // Add blur effect to calendar
    const calendarCard = document.querySelector('.calendar-card');
    calendarCard.style.filter = 'blur(5px)';
    calendarCard.style.transition = 'filter 0.8s ease';
    
    // Wait for fade effect then show reveal page
    setTimeout(() => {
        calendarPage.classList.remove('active');
        revealPage.classList.add('active');
        
        // Animate the reveal
        animateDateReveal();
        
        // Create heart particles
        createHeartExplosion();
        
        // Play a subtle sound effect (optional)
        playClickSound();
    }, 800);
}

function animateDateReveal() {
    // Reset animation classes
    revealMessage.classList.remove('animate__fadeIn', 'animate__bounceIn', 'animate__zoomIn');
    dateFocus.classList.remove('animate__pulse', 'animate__heartBeat');
    
    // Force reflow to restart animation
    void revealMessage.offsetWidth;
    void dateFocus.offsetWidth;
    
    // Add animations
    revealMessage.classList.add('animate__animated', 'animate__fadeIn');
    dateFocus.classList.add('animate__animated', 'animate__pulse');
    
    // Animate text reveal with delay
    setTimeout(() => {
        revealMessage.classList.add('animate__heartBeat');
    }, 500);
}

function createHeartExplosion() {
    // Clear previous hearts
    heartParticles.innerHTML = '';
    
    // Create 25 heart particles
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = getRandomHeartEmoji();
        
        // Random position around the focused date
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        heart.style.position = 'absolute';
        heart.style.left = `calc(50% + ${x}px)`;
        heart.style.top = `calc(50% + ${y}px)`;
        
        // Random animation delay and duration
        const delay = Math.random() * 0.5;
        const duration = 1.5 + Math.random() * 1;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        // Random size
        const size = 1.5 + Math.random() * 2;
        heart.style.fontSize = `${size}rem`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        heartParticles.appendChild(heart);
    }
    
    // Create additional floating hearts in background
    createFloatingHearts();
}

function createFloatingHearts() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-extra';
        heart.textContent = getRandomHeartEmoji();
        
        // Random position
        const left = Math.random() * 80 + 10;
        const top = Math.random() * 80 + 10;
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        
        // Random size
        const size = 1 + Math.random() * 1.5;
        heart.style.fontSize = `${size}rem`;
        
        // Random animation
        const duration = 3 + Math.random() * 3;
        heart.style.animation = `float ${duration}s ease-in-out infinite`;
        
        // Random animation delay
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(heart);
        
        // Remove after a while
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000);
    }
}

function getRandomHeartEmoji() {
    const hearts = ['💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    return hearts[Math.floor(Math.random() * hearts.length)];
}

function playClickSound() {
    // Create a subtle click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5 note
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

function resetCalendar() {
    // Reset all dates opacity and blur
    const allDates = document.querySelectorAll('.date-cell');
    allDates.forEach(date => {
        date.style.opacity = '1';
        date.style.filter = 'none';
    });
    
    // Reset calendar card blur
    const calendarCard = document.querySelector('.calendar-card');
    if (calendarCard) {
        calendarCard.style.filter = 'none';
    }
    
    // Clear extra floating hearts
    const extraHearts = document.querySelectorAll('.floating-heart-extra');
    extraHearts.forEach(heart => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    });
}

// ========== FUNGSI NAVIGASI ==========
function goToPreviousPage() {
    // Simulasi kembali ke halaman kangen
    // Dalam implementasi nyata: window.location.href = 'kangen.html';
    console.log("Navigasi ke halaman kangen.html");
    alert("Ini akan kembali ke halaman Kangen 💕");
}

function goToNextPage() {
    // Simulasi ke halaman berikutnya
    // Dalam implementasi nyata: window.location.href = 'next-page.html';
    console.log("Navigasi ke halaman berikutnya");
    alert("Ini akan lanjut ke halaman Janji Kita 💍");
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize heart cursor
    initHeartCursor();
    
    // Add CSS for extra elements
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        .floating-heart-extra {
            position: fixed;
            font-size: 1.5rem;
            opacity: 0.3;
            pointer-events: none;
            z-index: 2;
            animation-timing-function: ease-in-out;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-30px) rotate(10deg); opacity: 0.7; }
        }
        
        /* Tooltip enhancements */
        .date-cell {
            position: relative;
        }
        
        /* Special date hover effects */
        .special-date:hover {
            transform: scale(1.05) !important;
            z-index: 10;
        }
        
        /* Cursor styles */
        .cursor-heart {
            position: fixed;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            pointer-events: none;
            z-index: 9999;
            font-size: 24px;
            color: #ff6b8b;
            text-shadow: 0 0 10px rgba(255, 107, 139, 0.7);
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
            animation: heartbeat 1.2s infinite;
            display: none;
        }
        
        .cursor-trail {
            position: fixed;
            top: 0;
            left: 0;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 107, 139, 0.4);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, opacity 0.3s;
            display: none;
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            25% { transform: translate(-50%, -50%) scale(1.1); }
            50% { transform: translate(-50%, -50%) scale(1); }
            75% { transform: translate(-50%, -50%) scale(1.05); }
        }
        
        .cursor-click {
            animation: clickEffect 0.3s ease;
        }
        
        @keyframes clickEffect {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(0.8); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .special-date .date-tooltip {
                font-size: 0.7rem;
                padding: 6px 10px;
                top: -40px;
            }
            
            .cursor-heart {
                font-size: 20px;
            }
            
            .cursor-trail {
                width: 8px;
                height: 8px;
            }
        }
    `;
    document.head.appendChild(extraStyles);
    
    // Special date click event
    if (specialDate) {
        specialDate.addEventListener('click', handleSpecialDateClick);
        
        // Special hover effect for special date
        specialDate.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 25px rgba(255, 107, 139, 0.5)';
        });
        
        specialDate.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(255, 107, 139, 0.3)';
        });
        
        // Make special date focusable for keyboard navigation
        specialDate.setAttribute('tabindex', '0');
        specialDate.setAttribute('aria-label', 'Tanggal 5 Februari, hari spesial kita. Klik untuk kejutan.');
        specialDate.setAttribute('role', 'button');
    }
    
    // Back button event
    if (backCalendarBtn) {
        backCalendarBtn.addEventListener('click', function() {
            // Go back to calendar view
            revealPage.classList.remove('active');
            calendarPage.classList.add('active');
            
            // Reset calendar state
            resetCalendar();
        });
    }
    
    // Promise button event
    if (promiseBtn) {
        promiseBtn.addEventListener('click', goToNextPage);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset any position-dependent elements if needed
    });
    
    // Add subtle hover effect to all date cells (except empty ones)
    const dateCells = document.querySelectorAll('.date-cell:not(.empty)');
    dateCells.forEach(cell => {
        if (cell !== specialDate) {
            cell.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            });
            
            cell.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && revealPage && revealPage.classList.contains('active')) {
            // Escape key goes back to calendar
            if (backCalendarBtn) backCalendarBtn.click();
        }
        
        if (e.key === 'Enter' && document.activeElement === specialDate) {
            // Enter key triggers special date click
            handleSpecialDateClick();
        }
        
        // Number 5 key also triggers special date
        if (e.key === '5') {
            handleSpecialDateClick();
        }
    });
    
    // Initialize with calendar page active
    if (calendarPage) {
        calendarPage.classList.add('active');
    }
    
    // Add calendar animations after a short delay
    setTimeout(addCalendarAnimations, 300);
});

// ========== FUNGSI TAMBAHAN UNTUK ANIMASI ==========
function addCalendarAnimations() {
    // Add staggered animation to date cells
    const dateCells = document.querySelectorAll('.date-cell:not(.empty)');
    dateCells.forEach((cell, index) => {
        // Add delay based on position
        const delay = index * 0.05;
        cell.style.animationDelay = `${delay}s`;
        if (!cell.classList.contains('animate__animated')) {
            cell.classList.add('animate__animated', 'animate__fadeIn');
        }
    });
    
    // Add animation to weekdays
    const weekdays = document.querySelectorAll('.day-name');
    weekdays.forEach((day, index) => {
        const delay = index * 0.1;
        day.style.animationDelay = `${delay}s`;
        if (!day.classList.contains('animate__animated')) {
            day.classList.add('animate__animated', 'animate__fadeInDown');
        }
    });
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    // Remove event listeners to prevent memory leaks
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    
    const interactiveElements = document.querySelectorAll('button, .date-cell, .card, .action-btn, a');
    interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
    });
});

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHeartCursor,
        handleSpecialDateClick,
        resetCalendar,
        goToPreviousPage,
        goToNextPage
    };
}