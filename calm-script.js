// Minimal ambient script for quiet closing page
document.addEventListener('DOMContentLoaded', function() {
    const ambientHeartsContainer = document.querySelector('.ambient-hearts');
    const subtleParticlesContainer = document.querySelector('.subtle-particles');
    const mainText = document.querySelector('.main-text');
    
    // Create subtle floating particles
    function createSubtleParticles() {
        const particlesCount = 20;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = (Math.random() * 4 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = `rgba(255, 214, 204, ${0.05 + Math.random() * 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            subtleParticlesContainer.appendChild(particle);
            
            // Animate particle
            const duration = 15000 + Math.random() * 15000;
            const delay = Math.random() * 5000;
            
            particle.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                { transform: 'translateY(-20px) rotate(90deg)', opacity: 0.1 },
                { transform: 'translateY(-40px) rotate(180deg)', opacity: 0.05 },
                { transform: 'translateY(-60px) rotate(270deg)', opacity: 0 },
                { transform: 'translateY(-80px) rotate(360deg)', opacity: 0 },
                { transform: 'translateY(-100px) rotate(450deg)', opacity: 0 }
            ], {
                duration: duration,
                delay: delay,
                iterations: Infinity,
                easing: 'linear'
            });
        }
    }
    
    // Create occasional ambient hearts
    function createAmbientHeart() {
        // Even more occasional - only 20% chance
        if (Math.random() > 0.2) return;
        
        const heart = document.createElement('div');
        heart.className = 'ambient-heart';
        heart.innerHTML = '❤';
        
        // Random position (avoid center where text is)
        let posX, posY;
        do {
            posX = Math.random() * 100;
            posY = Math.random() * 100;
        } while (posX > 40 && posX < 60 && posY > 40 && posY < 60); // Avoid center area
        
        heart.style.left = `${posX}%`;
        heart.style.top = `${posY}%`;
        
        // Very small size
        const size = 0.5 + Math.random() * 0.5;
        heart.style.fontSize = `${size}rem`;
        
        // Very transparent color
        const color = `rgba(255, 182, 182, ${0.1 + Math.random() * 0.15})`;
        heart.style.color = color;
        
        // Add to container
        ambientHeartsContainer.appendChild(heart);
        
        // Animate heart
        const duration = 6000 + Math.random() * 8000; // 6-14 seconds
        const delay = Math.random() * 2000;
        
        heart.style.animation = `heartFloat ${duration}ms ease-out ${delay}ms forwards`;
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                ambientHeartsContainer.removeChild(heart);
            }
        }, duration + delay);
    }
    
    // Initialize
    function init() {
        // Create subtle particles
        createSubtleParticles();
        
        // Create occasional ambient hearts
        setInterval(createAmbientHeart, 5000); // Every 5 seconds
        
        // Create initial hearts (fewer)
        setTimeout(() => {
            for (let i = 0; i < 2; i++) {
                setTimeout(createAmbientHeart, i * 1500);
            }
        }, 2000);
        
        // Very subtle text interaction
        let glowTimeout;
        mainText.addEventListener('mouseenter', function() {
            clearTimeout(glowTimeout);
            
            // Create one very subtle heart
            setTimeout(() => {
                createHeartNearText();
            }, 500);
        });
        
        mainText.addEventListener('mouseleave', function() {
            // No reset needed for minimal design
        });
        
        // Create heart near text (even more subtle)
        function createHeartNearText() {
            const heart = document.createElement('div');
            heart.className = 'ambient-heart';
            heart.innerHTML = '❤';
            
            // Position near text but not too close
            const offsetX = (Math.random() - 0.5) * 80;
            const offsetY = (Math.random() - 0.5) * 30;
            
            heart.style.left = `calc(50% + ${offsetX}px)`;
            heart.style.top = `calc(50% + ${offsetY}px)`;
            heart.style.fontSize = '0.9rem';
            heart.style.color = 'rgba(255, 182, 182, 0.15)';
            
            ambientHeartsContainer.appendChild(heart);
            
            // Animate
            const duration = 4000 + Math.random() * 3000;
            heart.style.animation = `heartFloat ${duration}ms ease-out forwards`;
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    ambientHeartsContainer.removeChild(heart);
                }
            }, duration);
        }
        
        // Add extremely subtle mouse effect
        let lastMouseMove = Date.now();
        document.addEventListener('mousemove', function(e) {
            const now = Date.now();
            
            // Only create effect every 3 seconds
            if (now - lastMouseMove > 3000) {
                if (Math.random() > 0.7) {
                    createMouseBreath(e.clientX, e.clientY);
                    lastMouseMove = now;
                }
            }
        });
        
        // Mouse breath effect (very subtle)
        function createMouseBreath(x, y) {
            const breath = document.createElement('div');
            breath.style.position = 'fixed';
            breath.style.width = '30px';
            breath.style.height = '30px';
            breath.style.borderRadius = '50%';
            breath.style.border = '1px solid rgba(255, 214, 204, 0.08)';
            breath.style.left = `${x}px`;
            breath.style.top = `${y}px`;
            breath.style.transform = 'translate(-50%, -50%)';
            breath.style.pointerEvents = 'none';
            breath.style.zIndex = '-1';
            
            document.body.appendChild(breath);
            
            // Animate
            breath.animate([
                { opacity: 0.1, transform: 'translate(-50%, -50%) scale(0.8)' },
                { opacity: 0, transform: 'translate(-50%, -50%) scale(2)' }
            ], {
                duration: 2000,
                easing: 'ease-out'
            });
            
            // Remove after animation
            setTimeout(() => {
                if (breath.parentNode) {
                    document.body.removeChild(breath);
                }
            }, 2000);
        }
    }
    
    // Start with delay
    setTimeout(init, 1000);
});