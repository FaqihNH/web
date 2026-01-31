// flower-gift.js - JavaScript untuk Halaman Hadiah Bunga

// ========== VARIABEL GLOBAL ==========
// Tambahkan variabel ini di bagian variabel global
const flowerPetals = document.getElementById('flower-petals');
const flowerCenter = document.getElementById('flower-center');
const giftPage = document.getElementById('gift-page');
const flowerRevealPage = document.getElementById('flower-reveal-page');
const openGiftBtn = document.getElementById('open-gift-btn');
const backGiftBtn = document.getElementById('back-gift-btn');
const nextGiftBtn = document.getElementById('next-gift-btn');
const flowerBud = document.getElementById('flower-bud');
const flowerBloomed = document.getElementById('flower-bloomed');
const petalsContainer = document.getElementById('petals-container');
const flowerMessage = document.getElementById('flower-message');
const interactionHint = document.querySelector('.interaction-hint');

// Kursor variables
let trailDots = [];
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorHeart = null;
let cursorTrail = null;

// Animation tracking
let isAnimating = false;
let flowerHoverEnabled = false;

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
    const interactiveElements = document.querySelectorAll('button, .card, .action-btn, .flower-bloomed, .gift-box');
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

function handleMouseEnter(e) {
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
    
    // Efek khusus untuk bunga
    if (e.target.classList.contains('flower-bloomed') && flowerHoverEnabled) {
        addSwayEffect(e.target);
    }
    
    // Efek khusus untuk kotak hadiah
    if (e.target.classList.contains('gift-box')) {
        addGiftHoverEffect(e.target);
    }
}

function handleMouseLeave(e) {
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
    
    // Hentikan efek sway bunga
    if (e.target.classList.contains('flower-bloomed')) {
        removeSwayEffect(e.target);
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
    
    // Efek klik khusus untuk bunga
    if (e.target.classList.contains('flower-bloomed') && flowerHoverEnabled) {
        createFlowerClickEffect(e);
    }
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

// ========== FUNGSI UTAMA HADIAH ==========
function openGift() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Mainkan efek suara pembukaan hadiah
    playGiftOpenSound();
    
    // Tambahkan efek blur pada background
    document.body.style.backdropFilter = 'blur(10px)';
    document.body.style.transition = 'backdrop-filter 1s ease';
    
    // Animasi kotak hadiah terbuka
    const giftBox = document.querySelector('.gift-box');
    giftBox.style.animation = 'giftOpen 1s ease forwards';
    
    // Tunggu sebentar lalu pindah ke halaman bunga
    setTimeout(() => {
        giftPage.classList.remove('active');
        flowerRevealPage.classList.add('active');
        
        // Mulai animasi bunga
        startFlowerAnimation();
        
        // Aktifkan interaksi bunga setelah animasi selesai
        setTimeout(() => {
            flowerHoverEnabled = true;
            isAnimating = false;
        }, 4000);
    }, 1500);
}

function startFlowerAnimation() {
    // Reset status
    flowerHoverEnabled = false;
    
    // Mainkan musik atau suara lembut
    playFlowerSound();
    
    // Setelah batang tumbuh, tunjukkan kuncup bunga
    setTimeout(() => {
        if (flowerBud) {
            flowerBud.style.display = 'block';
        }
        
        // Setelah kuncup muncul, mulai animasi kelopak jatuh
        setTimeout(() => {
            createFallingPetals();
            
            // Setelah kelopak, tunjukkan bunga mekar
            setTimeout(() => {
                if (flowerBud) {
                    flowerBud.style.opacity = '0';
                    flowerBud.style.transition = 'opacity 0.5s ease';
                }
                
                if (flowerBloomed) {
                    flowerBloomed.style.display = 'block';
                    
                    // Setelah bunga mekar, tunjukkan pesan
                    setTimeout(() => {
                        showFlowerMessage();
                        
                        // Setelah pesan, tunjukkan hint interaksi
                        setTimeout(() => {
                            showInteractionHint();
                        }, 1000);
                    }, 1000);
                }
            }, 1500);
        }, 500);
    }, 2000);
}

function createFallingPetals() {
    // Bersihkan kontainer kelopak
    petalsContainer.innerHTML = '';
    
    // Buat 25 kelopak jatuh
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = getRandomPetalEmoji();
        
        // Random position
        const left = Math.random() * 100;
        petal.style.left = `${left}%`;
        
        // Random animation duration dan delay
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 2;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        // Random size
        const size = 1 + Math.random() * 2;
        petal.style.fontSize = `${size}rem`;
        
        petalsContainer.appendChild(petal);
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, (duration + delay) * 1000);
    }
}

function getRandomPetalEmoji() {
    const petals = ['🌸', '🌺', '🌷', '🌼', '🌻', '🏵️', '💮', '🥀'];
    return petals[Math.floor(Math.random() * petals.length)];
}

function showFlowerMessage() {
    if (flowerMessage) {
        flowerMessage.style.display = 'block';
        
        // Mainkan efek suara untuk pesan
        playMessageSound();
    }
}

function showInteractionHint() {
    if (interactionHint) {
        interactionHint.style.display = 'block';
    }
}

function addSwayEffect(flower) {
    // Tambahkan efek goyang pada bunga
    flower.style.animation = 'gentleSway 2s ease-in-out infinite';
}

function removeSwayEffect(flower) {
    // Hentikan efek goyang
    flower.style.animation = 'none';
    
    // Reset ke posisi awal
    setTimeout(() => {
        flower.style.transform = 'rotate(0deg)';
    }, 100);
}

function addGiftHoverEffect(gift) {
    // Efek hover untuk kotak hadiah
    const giftBox = gift.closest('.gift-box');
    if (giftBox) {
        giftBox.style.animation = 'giftFloat 2s ease-in-out infinite';
        giftBox.style.transform = 'scale(1.05)';
    }
}

function createFlowerClickEffect(e) {
    // Buat efek klik khusus untuk bunga
    const heart = document.createElement('div');
    heart.className = 'flower-heart';
    heart.innerHTML = '💖';
    
    // Posisikan di tempat klik
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    heart.style.position = 'absolute';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = '2rem';
    heart.style.zIndex = '10';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'flowerHeartFloat 1s ease-out forwards';
    
    e.target.appendChild(heart);
    
    // Mainkan efek suara
    playFlowerClickSound();
    
    // Hapus setelah animasi selesai
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
}

// ========== FUNGSI SUARA ==========
function playGiftOpenSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Buat suara pembukaan hadiah
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Glissando naik
        oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
        oscillator.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.5); // C5
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

function playFlowerSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Mainkan chord yang lembut untuk bunga
        const notes = [329.63, 392.00, 493.88]; // E4, G4, B4
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 3);
            }, index * 500);
        });
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

function playMessageSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Suara untuk pesan yang muncul
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 659.25; // E5
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

function playFlowerClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Suara klik pada bunga
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 783.99; // G5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log("Audio context not supported or blocked by browser");
    }
}

// ========== FUNGSI NAVIGASI ==========
function goToPreviousPage() {
    // Kembali ke halaman janji
    // Dalam implementasi nyata: window.location.href = 'promise.html';
    console.log("Navigasi ke halaman promise.html");
    alert("Ini akan kembali ke halaman Janji Romantis 💕");
}

function goToNextPage() {
    // Ke halaman berikutnya (final)
    // Dalam implementasi nyata: window.location.href = 'final.html';
    console.log("Navigasi ke halaman berikutnya/final");
    alert("Ini akan menuju halaman terakhir/selesai 🎊");
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize heart cursor
    initHeartCursor();
    
    // Add CSS for extra animations
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        /* Gift open animation */
        @keyframes giftOpen {
            0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-50px) scale(1.1) rotate(10deg); opacity: 0.8; }
            100% { transform: translateY(-100px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        /* Flower heart click effect */
        .flower-heart {
            animation: flowerHeartFloat 1s ease-out forwards;
        }
        
        @keyframes flowerHeartFloat {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
            100% { transform: translate(-50%, -100px) scale(1) rotate(360deg); opacity: 0; }
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
        
        /* Sparkle animation for gift button */
        @keyframes gentleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
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
            
            .flower-heart {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(extraStyles);
    
    // Gift button event
    if (openGiftBtn) {
        openGiftBtn.addEventListener('click', openGift);
        
        // Tambahkan efek sparkle pada tombol
        for (let i = 0; i < 4; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            openGiftBtn.appendChild(sparkle);
        }
    }
    
    // Back button event
    if (backGiftBtn) {
        backGiftBtn.addEventListener('click', function() {
            // Reset state
            document.body.style.backdropFilter = 'none';
            flowerHoverEnabled = false;
            
            // Kembali ke halaman hadiah
            flowerRevealPage.classList.remove('active');
            giftPage.classList.add('active');
        });
    }
    
    // Next button event
    if (nextGiftBtn) {
        nextGiftBtn.addEventListener('click', goToNextPage);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Space atau Enter untuk membuka hadiah
        if ((e.key === ' ' || e.key === 'Enter') && giftPage.classList.contains('active')) {
            e.preventDefault();
            openGift();
        }
        
        // Escape untuk kembali
        if (e.key === 'Escape' && flowerRevealPage.classList.contains('active')) {
            backGiftBtn.click();
        }
        
        // Arrow right untuk lanjut
        if (e.key === 'ArrowRight' && flowerRevealPage.classList.contains('active')) {
            nextGiftBtn.click();
        }
        
        // Arrow left untuk kembali
        if (e.key === 'ArrowLeft' && flowerRevealPage.classList.contains('active')) {
            backGiftBtn.click();
        }
    });
    
    // Make gift box interactive
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.style.cursor = 'none';
        giftBox.addEventListener('click', function() {
            // Jika diklik langsung, buka hadiah
            openGift();
        });
    }
    
    // Initialize with gift page active
    if (giftPage) {
        giftPage.classList.add('active');
    }
    
    // Add subtle animations to elements
    setTimeout(() => {
        addPageAnimations();
    }, 300);
});

// ========== FUNGSI ANIMASI HALAMAN ==========
function addPageAnimations() {
    // Add animation to message bubble
    const messageBubble = document.querySelector('.message-bubble');
    if (messageBubble && !messageBubble.classList.contains('animate__animated')) {
        messageBubble.classList.add('animate__animated', 'animate__pulse');
        messageBubble.style.animationDelay = '0.5s';
        messageBubble.style.animationIterationCount = 'infinite';
        messageBubble.style.animationDuration = '3s';
    }
    
    // Add animation to gift box
    const giftBox = document.querySelector('.gift-box');
    if (giftBox && !giftBox.classList.contains('animate__animated')) {
        giftBox.classList.add('animate__animated');
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    // Remove event listeners to prevent memory leaks
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    
    const interactiveElements = document.querySelectorAll('button, .card, .action-btn, .flower-bloomed, .gift-box');
    interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
    });
});

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHeartCursor,
        openGift,
        startFlowerAnimation,
        goToPreviousPage,
        goToNextPage
    };
}