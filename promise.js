// promise.js - JavaScript untuk Halaman Janji Romantis

// ========== VARIABEL GLOBAL ==========
const promisePage = document.getElementById('promise-page');
const flowerPage = document.getElementById('flower-page');
const checklistItems = document.querySelectorAll('.checklist-item');
const progressCount = document.getElementById('progress-count');
const progressFill = document.getElementById('progress-fill');
const completionMessage = document.getElementById('completion-message');
const flowerBtn = document.getElementById('flower-btn');
const backPromiseBtn = document.getElementById('back-promise-btn');
const nextPromiseBtn = document.getElementById('next-promise-btn');
const backFlowerBtn = document.getElementById('back-flower-btn');
const finalNextBtn = document.getElementById('final-next-btn');
const flowerAnimation = document.getElementById('flower-animation');

// Kursor variables
let trailDots = [];
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorHeart = null;
let cursorTrail = null;

// Promise tracking
let checkedCount = 0;
const totalItems = 4;

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
    const interactiveElements = document.querySelectorAll('button, .checklist-item, .card, .action-btn, a');
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

// ========== FUNGSI UTAMA JANJI ==========
function initChecklist() {
    checklistItems.forEach(item => {
        item.addEventListener('click', handleChecklistClick);
        
        // Tambahkan efek hover
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('checked')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 30px rgba(255, 107, 139, 0.15)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('checked')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

function handleChecklistClick(e) {
    const item = e.currentTarget;
    
    // Jika sudah dicentang, jangan lakukan apa-apa
    if (item.classList.contains('checked')) return;
    
    // Tandai sebagai dicentang
    item.classList.add('checked');
    
    // Update progress
    checkedCount++;
    updateProgress();
    
    // Buat animasi hati di posisi klik
    createHeartAnimation(e.clientX, e.clientY, item);
    
    // Mainkan efek suara
    playCheckSound();
    
    // Update button state jika semua sudah dicentang
    if (checkedCount === totalItems) {
        showCompletionMessage();
        enableButtons();
    }
}

function createHeartAnimation(x, y, item) {
    // Buat elemen hati animasi
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = '💖';
    
    // Posisikan di tempat klik
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    // Random movement
    const tx = (Math.random() * 100 - 50) + 'px';
    const ty = (Math.random() * 100 - 50) + 'px';
    heart.style.setProperty('--tx', tx);
    heart.style.setProperty('--ty', ty);
    
    // Tambahkan ke body
    document.body.appendChild(heart);
    
    // Hapus setelah animasi selesai
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
    
    // Juga buat efek glow pada item
    createGlowEffect(item);
}

function createGlowEffect(item) {
    // Tambahkan efek glow sementara
    item.style.boxShadow = '0 0 30px rgba(255, 107, 139, 0.6)';
    
    // Hapus efek glow setelah 1 detik
    setTimeout(() => {
        if (item.classList.contains('checked')) {
            item.style.boxShadow = '0 10px 25px rgba(255, 107, 139, 0.2)';
        } else {
            item.style.boxShadow = 'none';
        }
    }, 1000);
}

function updateProgress() {
    // Update progress count
    progressCount.textContent = checkedCount;
    
    // Update progress bar
    const percentage = (checkedCount / totalItems) * 100;
    progressFill.style.width = `${percentage}%`;
    
    // Animasi progress bar
    progressFill.classList.add('progress-update');
    setTimeout(() => {
        progressFill.classList.remove('progress-update');
    }, 800);
}

function showCompletionMessage() {
    // Tampilkan pesan penyelesaian
    completionMessage.classList.add('show');
    
    // Tambahkan efek konfeti
    createConfettiEffect();
    
    // Mainkan suara penyelesaian
    playCompletionSound();
}

function enableButtons() {
    // Aktifkan tombol bunga dan lanjut
    flowerBtn.disabled = false;
    nextPromiseBtn.disabled = false;
    
    // Tambahkan animasi pada tombol bunga
    flowerBtn.classList.add('enabled');
}

function playCheckSound() {
    // Buat suara centang sederhana
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 659.25; // E5 note
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

function playCompletionSound() {
    // Buat suara penyelesaian yang lebih meriah
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Mainkan beberapa not sekaligus
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, index * 100);
        });
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

function createConfettiEffect() {
    // Buat efek konfeti sederhana
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.innerHTML = '💖';
        
        // Random position
        const left = Math.random() * 100;
        const top = -10;
        confetti.style.left = `${left}%`;
        confetti.style.top = `${top}%`;
        
        // Random size
        const size = 0.8 + Math.random() * 1.2;
        confetti.style.fontSize = `${size}rem`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        // Random animation
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 1;
        confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`;
        
        container.appendChild(confetti);
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (duration + delay) * 1000);
    }
}

// ========== FUNGSI HALAMAN BUNGA ==========
function showFlowerPage() {
    // Pindah ke halaman bunga
    promisePage.classList.remove('active');
    flowerPage.classList.add('active');
    
    // Mulai animasi bunga
    startFlowerAnimation();
    
    // Mainkan musik atau suara lembut
    playFlowerSound();
}

function startFlowerAnimation() {
    // Bersihkan area animasi
    flowerAnimation.innerHTML = '';
    
    // Buat efek kelopak jatuh
    for (let i = 0; i < 15; i++) {
        createPetal(i);
    }
    
    // Setelah kelopak, tampilkan bunga
    setTimeout(() => {
        createFlowerBloom();
    }, 1500);
}

function createPetal(index) {
    const petal = document.createElement('div');
    petal.className = 'flower-petal';
    petal.innerHTML = '🌸';
    
    // Random position
    const left = Math.random() * 100;
    petal.style.left = `${left}%`;
    
    // Random delay
    const delay = index * 0.2 + Math.random() * 0.5;
    petal.style.animationDelay = `${delay}s`;
    
    // Random size
    const size = 1.5 + Math.random() * 1.5;
    petal.style.fontSize = `${size}rem`;
    
    flowerAnimation.appendChild(petal);
    
    // Hapus setelah animasi selesai
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 4000);
}

function createFlowerBloom() {
    const flower = document.createElement('div');
    flower.className = 'flower-bloom';
    flower.innerHTML = '🌸';
    
    flowerAnimation.appendChild(flower);
    
    // Tambahkan efek cahaya
    setTimeout(() => {
        createLightEffect();
    }, 500);
}

function createLightEffect() {
    const light = document.createElement('div');
    light.className = 'flower-light';
    light.style.position = 'absolute';
    light.style.top = '50%';
    light.style.left = '50%';
    light.style.transform = 'translate(-50%, -50%)';
    light.style.width = '200px';
    light.style.height = '200px';
    light.style.borderRadius = '50%';
    light.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
    light.style.zIndex = '1';
    light.style.pointerEvents = 'none';
    light.style.animation = 'lightPulse 2s ease-out infinite';
    
    flowerAnimation.appendChild(light);
}

function playFlowerSound() {
    // Musik atau suara lembut untuk halaman bunga
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Mainkan chord yang lembut
        const notes = [392.00, 493.88, 587.33]; // G4, B4, D5
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 2);
            }, index * 200);
        });
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

// ========== FUNGSI NAVIGASI ==========
function goToPreviousPage() {
    // Kembali ke halaman kalender
    // Dalam implementasi nyata: window.location.href = 'calendar.html';
    console.log("Navigasi ke halaman calendar.html");
    alert("Ini akan kembali ke halaman Kalender 📅");
}

function goToFinalPage() {
    // Ke halaman akhir/selesai
    // Dalam implementasi nyata: window.location.href = 'final.html';
    console.log("Navigasi ke halaman akhir");
    alert("Ini akan menuju halaman akhir/selesai 🏁");
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize heart cursor
    initHeartCursor();
    
    // Add CSS for animations
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        /* Confetti animation */
        .confetti-piece {
            position: absolute;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 100;
            animation-timing-function: ease-in;
        }
        
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        /* Light pulse animation */
        @keyframes lightPulse {
            0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        /* Progress bar animation */
        .progress-update {
            animation: progressPulse 0.8s ease;
        }
        
        @keyframes progressPulse {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(1.02); }
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
        
        /* Button enabled state */
        .flower-btn.enabled {
            animation: buttonGlow 2s infinite;
        }
        
        @keyframes buttonGlow {
            0%, 100% { box-shadow: 0 10px 25px rgba(255, 107, 139, 0.3); }
            50% { box-shadow: 0 10px 30px rgba(255, 107, 139, 0.6); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .cursor-heart {
                font-size: 20px;
            }
            
            .cursor-trail {
                width: 8px;
                height: 8px;
            }
            
            .heart-animation {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(extraStyles);
    
    // Initialize checklist
    initChecklist();
    
    // Flower button event
    if (flowerBtn) {
        flowerBtn.addEventListener('click', function() {
            if (!this.disabled) {
                showFlowerPage();
            }
        });
    }
    
    // Back button event (from promise page)
    if (backPromiseBtn) {
        backPromiseBtn.addEventListener('click', goToPreviousPage);
    }
    
    // Next button event (from promise page)
    if (nextPromiseBtn) {
        nextPromiseBtn.addEventListener('click', goToFinalPage);
    }
    
    // Back button event (from flower page)
    if (backFlowerBtn) {
        backFlowerBtn.addEventListener('click', function() {
            flowerPage.classList.remove('active');
            promisePage.classList.add('active');
        });
    }
    
    // Final next button event
    if (finalNextBtn) {
        finalNextBtn.addEventListener('click', goToFinalPage);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key untuk kembali
        if (e.key === 'Escape' && flowerPage.classList.contains('active')) {
            backFlowerBtn.click();
        }
        
        // Angka 1-4 untuk mencentang checklist item
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            if (checklistItems[index] && !checklistItems[index].classList.contains('checked')) {
                checklistItems[index].click();
            }
        }
        
        // Enter untuk tombol bunga jika tersedia
        if (e.key === 'Enter' && flowerBtn && !flowerBtn.disabled && document.activeElement !== flowerBtn) {
            flowerBtn.click();
        }
    });
    
    // Make checklist items focusable for keyboard navigation
    checklistItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'checkbox');
        item.setAttribute('aria-label', `Janji ${index + 1}: ${item.querySelector('.item-title').textContent}`);
    });
    
    // Initialize with promise page active
    if (promisePage) {
        promisePage.classList.add('active');
    }
    
    // Add subtle animations to elements
    setTimeout(() => {
        addPageAnimations();
    }, 300);
});

// ========== FUNGSI ANIMASI HALAMAN ==========
function addPageAnimations() {
    // Add staggered animation to checklist items
    checklistItems.forEach((item, index) => {
        const delay = index * 0.15;
        item.style.animationDelay = `${delay}s`;
        if (!item.classList.contains('animate__animated')) {
            item.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
    
    // Add animation to progress container
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer && !progressContainer.classList.contains('animate__animated')) {
        progressContainer.classList.add('animate__animated', 'animate__fadeIn');
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    // Remove event listeners to prevent memory leaks
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    
    const interactiveElements = document.querySelectorAll('button, .checklist-item, .card, .action-btn, a');
    interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
    });
    
    checklistItems.forEach(item => {
        item.removeEventListener('click', handleChecklistClick);
    });
});

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHeartCursor,
        initChecklist,
        handleChecklistClick,
        showFlowerPage,
        goToPreviousPage,
        goToFinalPage
    };
}

