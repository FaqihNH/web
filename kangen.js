// kangen.js - JavaScript untuk Halaman Interaktif "Kangen"

// ========== VARIABEL GLOBAL ==========
const landingPage = document.getElementById('landing-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');
const startBtn = document.getElementById('start-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const resultText = document.getElementById('result-text');
const heartsContainer = document.getElementById('hearts-container');
const body = document.body;
const confettiCanvas = document.getElementById('confetti-canvas');

// State variables
let noButtonClicks = 0;
let noButtonHoverCount = 0;
let warmBackground = false;
let trailDots = [];
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Inisialisasi canvas confetti
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// ========== FUNGSI INISIALISASI ==========
function initHeartCursor() {
    const cursorHeart = document.createElement('div');
    cursorHeart.className = 'cursor-heart';
    cursorHeart.innerHTML = '💖';
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    
    document.body.appendChild(cursorHeart);
    document.body.appendChild(cursorTrail);
    
    // Update posisi kursor
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update posisi kursor utama dengan sedikit delay untuk efek smooth
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursorHeart.style.left = `${cursorX}px`;
        cursorHeart.style.top = `${cursorY}px`;
        
        cursorTrail.style.left = `${mouseX}px`;
        cursorTrail.style.top = `${mouseY}px`;
        
        // Buat trail dots
        createTrailDot(mouseX, mouseY);
    });
    
    // Efek hover pada elemen interaktif
    const interactiveElements = document.querySelectorAll('button, a, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorHeart.style.fontSize = '32px';
            cursorHeart.style.color = '#ff3366';
            cursorHeart.style.textShadow = '0 0 15px rgba(255, 51, 102, 0.8)';
            
            cursorTrail.style.width = '20px';
            cursorTrail.style.height = '20px';
            cursorTrail.style.background = 'rgba(255, 107, 139, 0.7)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorHeart.style.fontSize = '24px';
            cursorHeart.style.color = '#ff6b8b';
            cursorHeart.style.textShadow = '0 0 10px rgba(255, 107, 139, 0.7)';
            
            cursorTrail.style.width = '12px';
            cursorTrail.style.height = '12px';
            cursorTrail.style.background = 'rgba(255, 107, 139, 0.4)';
        });
    });
    
    // Sembunyikan kursor default
    document.body.style.cursor = 'none';
    
    // Tampilkan kursor custom
    cursorHeart.style.display = 'block';
    cursorTrail.style.display = 'block';
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

// ========== FUNGSI UTAMA ==========
function createHeartExplosion() {
    // Clear previous hearts
    heartsContainer.innerHTML = '';
    
    // Create 30 heart particles
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = getRandomHeartEmoji();
        
        // Random position
        const left = Math.random() * 80 + 10; // 10% to 90%
        heart.style.left = `${left}%`;
        
        // Random animation delay and duration
        const delay = Math.random() * 0.5;
        const duration = 1 + Math.random() * 1;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        // Random size
        const size = 1 + Math.random() * 1.5;
        heart.style.fontSize = `${size}rem`;
        
        heartsContainer.appendChild(heart);
    }
    
    // Create emoji pop-ups
    createEmojiPopups();
}

function createEmojiPopups() {
    const emojis = ['😍', '🥰', '😘', '💖', '💕', '💗', '💓', '💞', '✨', '🌟'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random position
        const left = Math.random() * 80 + 10;
        const top = Math.random() * 80 + 10;
        emoji.style.left = `${left}%`;
        emoji.style.top = `${top}%`;
        
        // Random size
        const size = 1.5 + Math.random() * 2;
        emoji.style.fontSize = `${size}rem`;
        
        // Random animation
        const duration = 2 + Math.random() * 2;
        emoji.style.animation = `float-up ${duration}s ease-out forwards`;
        
        container.appendChild(emoji);
        
        // Remove emoji after animation completes
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        }, duration * 1000);
    }
}

function createSparkles(element) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position within the button
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        sparkle.style.left = `${left}%`;
        sparkle.style.top = `${top}%`;
        
        // Random size
        const size = 5 + Math.random() * 10;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Add animation
        sparkle.style.animation = `sparkle-twinkle 1s ${i * 0.1}s infinite`;
        
        element.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

function resetNoButton() {
    noButtonClicks = 0;
    noButtonHoverCount = 0;
    
    // Reset styles
    noBtn.style.transform = 'scale(1)';
    noBtn.style.opacity = '1';
    noBtn.style.pointerEvents = 'auto';
    
    // Reset text
    const btnText = noBtn.querySelector('.btn-text');
    const btnEmoji = noBtn.querySelector('.btn-emoji');
    if (btnText) btnText.textContent = "NGGAK KANGEN";
    if (btnEmoji) btnEmoji.textContent = "😐";
    
    // Reset yes button
    yesBtn.style.transform = 'scale(1)';
    yesBtn.style.boxShadow = '0 15px 30px rgba(255, 107, 139, 0.4)';
}

function getRandomHeartEmoji() {
    const hearts = ['💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟'];
    return hearts[Math.floor(Math.random() * hearts.length)];
}

function getRunAwayMessage(count) {
    const messages = [
        "Coba klik aku! 😜",
        "Jangan di-hover dong! 😅",
        "Aku lari nih! 🏃‍♂️",
        "Kejar aku kalo bisa! 😝",
        "Kamu ga akan bisa klik aku! 😎",
        "Coba lagi deh! 🤪",
        "Hampir aja! 😏",
        "Makin susah nih! 🥴"
    ];
    
    return messages[Math.min(count - 1, messages.length - 1)] || messages[messages.length - 1];
}

// ========== FUNGSI CONFETTI ==========
function launchConfetti() {
    const confettiCount = 150;
    const colors = ['#ff6b8b', '#ff8e53', '#36d1dc', '#5b86e5', '#ffcc00'];
    
    for (let i = 0; i < confettiCount; i++) {
        // Create confetti piece
        const confetti = {
            x: Math.random() * confettiCanvas.width,
            y: -20,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            shape: Math.random() > 0.5 ? 'circle' : 'rect'
        };
        
        // Draw confetti
        drawConfetti(confetti);
        
        // Animate confetti falling
        animateConfetti(confetti, i);
    }
}

function drawConfetti(confetti) {
    ctx.save();
    ctx.translate(confetti.x, confetti.y);
    ctx.rotate(confetti.rotation * Math.PI / 180);
    
    ctx.fillStyle = confetti.color;
    
    if (confetti.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, confetti.size / 2, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
    }
    
    ctx.restore();
}

function animateConfetti(confetti, index) {
    let yPos = confetti.y;
    let rotation = confetti.rotation;
    
    function animate() {
        // Clear this confetti's previous position
        ctx.clearRect(confetti.x - confetti.size - 1, yPos - confetti.size - 1, 
                     confetti.size * 2 + 2, confetti.size * 2 + 2);
        
        // Update position
        yPos += confetti.speed;
        rotation += confetti.rotationSpeed;
        
        // Reset if out of screen
        if (yPos > confettiCanvas.height) {
            yPos = -20;
            confetti.x = Math.random() * confettiCanvas.width;
        }
        
        // Draw at new position
        ctx.save();
        ctx.translate(confetti.x, yPos);
        ctx.rotate(rotation * Math.PI / 180);
        
        ctx.fillStyle = confetti.color;
        
        if (confetti.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, confetti.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
        }
        
        ctx.restore();
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation with staggered delay
    setTimeout(animate, index * 10);
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi kursor hati
    initHeartCursor();
    
    // Tambahkan CSS untuk efek kursor
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        /* Custom Heart Cursor */
        body {
            cursor: none !important;
        }
        
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
        
        .trail-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 182, 193, 0.6);
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
            animation: fadeTrail 0.5s forwards;
        }
        
        @keyframes fadeTrail {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            25% { transform: translate(-50%, -50%) scale(1.1); }
            50% { transform: translate(-50%, -50%) scale(1); }
            75% { transform: translate(-50%, -50%) scale(1.05); }
        }
        
        /* Efek klik pada kursor */
        @keyframes clickEffect {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(0.8); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        .cursor-click {
            animation: clickEffect 0.3s ease;
        }
        
        /* Floating emoji */
        .floating-emoji {
            position: fixed;
            font-size: 2rem;
            z-index: 100;
            pointer-events: none;
            animation-timing-function: ease-out;
        }
        
        @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        /* Sparkle effect */
        @keyframes sparkle-twinkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        /* Action buttons dengan desain lucu */
        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-top: 40px;
            flex-wrap: wrap;
        }
        
        .action-btn {
            padding: 18px 35px;
            font-size: 1.2rem;
            font-weight: 700;
            border: none;
            border-radius: 60px;
            cursor: none !important;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            min-width: 180px;
            justify-content: center;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
        
        .action-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.7s;
            z-index: -1;
        }
        
        .action-btn:hover::before {
            left: 100%;
        }
        
        .back-btn {
            background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
            color: #fff;
            border: 3px solid #ff7b9c;
        }
        
        .back-btn:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 25px rgba(255, 107, 139, 0.4);
            background: linear-gradient(135deg, #ff7b9c 0%, #f8c0aa 100%);
            letter-spacing: 1px;
        }
        
        .next-btn {
            background: linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%);
            color: white;
            border: 3px solid #36d1dc;
        }
        
        .next-btn:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 25px rgba(54, 209, 220, 0.4);
            background: linear-gradient(135deg, #2ab7c1 0%, #4a6fd8 100%);
            letter-spacing: 1px;
        }
        
        /* Tambahkan icon yang lucu */
        .back-btn::after {
            content: '👈';
            position: absolute;
            right: -30px;
            opacity: 0;
            transition: all 0.3s ease;
            font-size: 1.5rem;
        }
        
        .back-btn:hover::after {
            right: 15px;
            opacity: 1;
        }
        
        .next-btn::after {
            content: '👉';
            position: absolute;
            left: -30px;
            opacity: 0;
            transition: all 0.3s ease;
            font-size: 1.5rem;
        }
        
        .next-btn:hover::after {
            left: 15px;
            opacity: 1;
        }
        
        /* Floating animation untuk button */
        @keyframes floatButton {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .action-btn {
            animation: floatButton 4s ease-in-out infinite;
        }
        
        .next-btn {
            animation-delay: 0.5s;
        }
        
        /* Responsive Design untuk Action Buttons */
        @media (max-width: 768px) {
            .action-btn {
                min-width: 160px;
                padding: 16px 25px;
                font-size: 1.1rem;
            }
            
            .back-btn::after,
            .next-btn::after {
                display: none;
            }
        }
        
        button:hover {
            cursor: none !important;
        }
    `;
    document.head.appendChild(cursorStyles);
    
    // Start button - go to question page
    startBtn.addEventListener('click', function() {
        landingPage.classList.remove('active');
        questionPage.classList.add('active');
        
        // Add some animation to the transition
        questionPage.style.animation = 'fadeIn 0.8s ease';
    });
    
    // Yes button - show result with effects
    yesBtn.addEventListener('click', function() {
        // Show result page
        questionPage.classList.remove('active');
        resultPage.classList.add('active');
        
        // Create heart explosion
        createHeartExplosion();
        
        // Trigger confetti
        launchConfetti();
        
        // Change background to warmer color
        if (!warmBackground) {
            body.style.background = 'linear-gradient(135deg, #ffd6d6 0%, #ffb8b8 50%, #ffd6a6 100%)';
            warmBackground = true;
        }
        
        // Update result text with random happy endings
        const happyMessages = [
            "Aku juga kangen banget 😭💗",
            "Wah, akhirnya ngaku juga! Aku juga kangen 😊💕",
            "Yey! Aku udah dari tadi nungguin chat kamu 😘",
            "Aku kangennya lebih banyak! 💖🌸",
            "Hari ini jadi indah karena kamu kangen 💫✨"
        ];
        
        const randomMessage = happyMessages[Math.floor(Math.random() * happyMessages.length)];
        resultText.textContent = randomMessage;
        
        // Make the yes button glow and grow (already on result page)
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.boxShadow = '0 0 40px rgba(255, 107, 139, 0.8)';
        
        // Add sparkle effects to yes button
        createSparkles(yesBtn);
    });
    
    // No button hover effect - shrink and move away
    noBtn.addEventListener('mouseenter', function() {
        noButtonHoverCount++;
        
        // Random direction for movement
        const moveX = Math.random() * 40 - 20; // -20px to 20px
        const moveY = Math.random() * 40 - 20;
        
        // Apply transform
        noBtn.style.transform = `scale(0.9) translate(${moveX}px, ${moveY}px)`;
        noBtn.style.transition = 'all 0.3s ease';
        
        // Show run away text
        const runAwayText = document.querySelector('.run-away-text');
        if (runAwayText) {
            runAwayText.textContent = getRunAwayMessage(noButtonHoverCount);
        }
    });
    
    // No button mouse leave - reset
    noBtn.addEventListener('mouseleave', function() {
        noBtn.style.transform = 'scale(1) translate(0, 0)';
    });
    
    // No button click - continuous shrinking and fading
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        noButtonClicks++;
        
        // Calculate new scale and opacity
        const scale = Math.max(0.1, 1 - (noButtonClicks * 0.3));
        const opacity = Math.max(0, 1 - (noButtonClicks * 0.4));
        
        // Apply shrinking and fading
        noBtn.style.transform = `scale(${scale})`;
        noBtn.style.opacity = opacity;
        noBtn.style.transition = 'all 0.5s ease';
        
        // Make yes button grow larger and glow
        const yesScale = 1 + (noButtonClicks * 0.15);
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.boxShadow = `0 0 ${20 + (noButtonClicks * 10)}px rgba(255, 107, 139, 0.7)`;
        yesBtn.style.transition = 'all 0.5s ease';
        
        // Change no button text after a few clicks
        if (noButtonClicks === 1) {
            setTimeout(() => {
                const btnText = noBtn.querySelector('.btn-text');
                const btnEmoji = noBtn.querySelector('.btn-emoji');
                if (btnText) btnText.textContent = "SERIUS NGGAK?";
                if (btnEmoji) btnEmoji.textContent = "😶";
            }, 300);
        } else if (noButtonClicks === 2) {
            setTimeout(() => {
                const btnText = noBtn.querySelector('.btn-text');
                const btnEmoji = noBtn.querySelector('.btn-emoji');
                if (btnText) btnText.textContent = "YAKIN?";
                if (btnEmoji) btnEmoji.textContent = "😔";
            }, 300);
        } else if (noButtonClicks >= 3) {
            setTimeout(() => {
                const btnText = noBtn.querySelector('.btn-text');
                const btnEmoji = noBtn.querySelector('.btn-emoji');
                if (btnText) btnText.textContent = "OK LAH...";
                if (btnEmoji) btnEmoji.textContent = "😥";
                
                // After 3 clicks, automatically click yes button after delay
                if (noButtonClicks === 3) {
                    setTimeout(() => {
                        yesBtn.click();
                    }, 1000);
                }
            }, 300);
        }
        
        // Prevent further shrinking after too many clicks
        if (noButtonClicks >= 4) {
            noBtn.style.pointerEvents = 'none';
        }
    });
    
    // Back button - go to question page
    backBtn.addEventListener('click', function() {
        resultPage.classList.remove('active');
        questionPage.classList.add('active');
        
        // Reset no button
        resetNoButton();
    });
    
    // Next button - go to landing page with a thank you message
    nextBtn.addEventListener('click', function() {
        resultPage.classList.remove('active');
        landingPage.classList.add('active');
        
        // Update landing page with thank you message
        const title = document.querySelector('.title');
        const subtitle = document.querySelector('.subtitle');
        const emojiCircle = document.querySelector('.emoji-circle');
        
        if (title) title.textContent = "Terima Kasih! 💖";
        if (subtitle) subtitle.textContent = "Senang banget kamu udah jawab dengan jujur!";
        if (emojiCircle) emojiCircle.textContent = "🥰";
        
        // Reset no button
        resetNoButton();
    });
    
    // Handle window resize for confetti canvas
    window.addEventListener('resize', function() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
    
    // Efek klik pada kursor
    document.addEventListener('click', (e) => {
        const cursorHeart = document.querySelector('.cursor-heart');
        if (cursorHeart) {
            cursorHeart.classList.add('cursor-click');
            setTimeout(() => {
                cursorHeart.classList.remove('cursor-click');
            }, 300);
        }
        
        // Tambahkan efek ledakan kecil di titik klik
        createClickEffect(e.clientX, e.clientY);
    });
    
    // Initialize with landing page active
    landingPage.classList.add('active');
});