// Heart cursor trail effect
document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi elemen
  const cursorTrail = document.querySelector(".heart-cursor-trail");
  const specialButton = document.getElementById("specialButton");
  const futureButton = document.getElementById("futureButton");
  const loveMessage = document.getElementById("loveMessage");
  const giftPopup = document.querySelector(".gift-popup");
  const giftClose = document.querySelector(".gift-close");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const saveMemoryBtn = document.querySelector(".save-memory-btn");

  // Cek apakah halaman promise.html ada (untuk navigasi)
  let hasPromisePage = true;

  // Buat halaman future popup jika belum ada
  createFuturePopup();

  // Heart cursor trail
  const hearts = [];
  const heartCount = 15;

  // Create heart elements for cursor trail
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.className = "cursor-heart";
    heart.innerHTML = "❤";
    heart.style.position = "fixed";
    heart.style.fontSize = Math.random() * 10 + 10 + "px";
    heart.style.color = `rgba(255, ${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 0.8)`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9998";
    heart.style.opacity = "0";
    heart.style.transition = "opacity 0.3s, transform 0.5s";
    document.body.appendChild(heart);
    hearts.push({
      el: heart,
      x: 0,
      y: 0,
      size: parseFloat(heart.style.fontSize),
      speed: 0.05 + Math.random() * 0.05,
    });
  }

  let mouseX = 0;
  let mouseY = 0;

  // Track mouse movement
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor trail position
    if (cursorTrail) {
      cursorTrail.style.left = mouseX + "px";
      cursorTrail.style.top = mouseY + "px";
      cursorTrail.style.opacity = "0.7";
    }

    // Update heart trail
    hearts.forEach((heart, index) => {
      const delay = index * 2;

      setTimeout(() => {
        heart.el.style.left = mouseX - heart.size / 2 + "px";
        heart.el.style.top = mouseY - heart.size / 2 + "px";
        heart.el.style.opacity = "0.7";

        // Fade out heart
        setTimeout(() => {
          heart.el.style.opacity = "0";
        }, 300);
      }, delay);
    });
  });

  // Special button click - Show gift popup
  specialButton.addEventListener("click", function (e) {
    // Create heart particles
    for (let i = 0; i < 20; i++) {
      createHeartParticle(e.clientX, e.clientY);
    }

    // Create confetti
    createConfetti();

    // Button animation
    specialButton.style.transform = "translateY(-5px) scale(0.95)";
    setTimeout(() => {
      specialButton.style.transform = "translateY(-5px) scale(1)";
    }, 150);

    // Show gift popup after a short delay
    setTimeout(() => {
      giftPopup.classList.add("active");

      // Play soft sound if music is available
      if (backgroundMusic) {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play().catch((e) => console.log("Autoplay prevented"));
      }
    }, 500);

    // Show love message
    setTimeout(() => {
      loveMessage.classList.add("visible");
    }, 1000);

    // Simpan ke localStorage bahwa user telah melihat gift
    localStorage.setItem("seenGift", "true");
    localStorage.setItem("giftDate", new Date().toISOString());
  });

  // Close gift popup
  giftClose.addEventListener("click", function () {
    giftPopup.classList.remove("active");

    // Create some closing hearts
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createHeartParticle(window.innerWidth / 2, window.innerHeight / 2);
      }, i * 100);
    }
  });

  // Save memory button
  saveMemoryBtn.addEventListener("click", function () {
    // Animation for save button
    saveMemoryBtn.innerHTML = '<i class="fas fa-check"></i> Memory Saved!';
    saveMemoryBtn.style.background =
      "linear-gradient(135deg, #a8e6cf, #6bcf9c)";

    // Create save confirmation effect
    createSaveEffect();

    // Reset button after 2 seconds
    setTimeout(() => {
      saveMemoryBtn.innerHTML = '<i class="fas fa-save"></i> Save This Memory';
      saveMemoryBtn.style.background =
        "linear-gradient(135deg, #ff9eb5, #ff6b8b)";
    }, 2000);

    // Simpan ke localStorage
    let savedMemories = JSON.parse(localStorage.getItem("memories")) || [];
    savedMemories.push({
      id: Date.now(),
      date: new Date().toISOString(),
      type: "gift",
      message: "A Special Gift for You",
    });
    localStorage.setItem("memories", JSON.stringify(savedMemories));
  });

  // Future button click
  futureButton.addEventListener("click", function () {
    // Create particle effect
    for (let i = 0; i < 15; i++) {
      createStarParticle(
        futureButton.getBoundingClientRect().left +
          futureButton.offsetWidth / 2,
        futureButton.getBoundingClientRect().top +
          futureButton.offsetHeight / 2,
      );
    }

    // Show future popup
    const futurePopup = document.querySelector(".future-popup");
    if (futurePopup) {
      futurePopup.classList.add("active");

      // Start countdown
      startCountdown();
    }
  });

  // Function to create heart particles
  function createHeartParticle(x, y) {
    const particle = document.createElement("div");
    particle.innerHTML = "❤";
    particle.style.position = "fixed";
    particle.style.fontSize = Math.random() * 20 + 15 + "px";
    particle.style.color = `rgba(255, ${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 0.9)`;
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.opacity = "1";
    particle.style.transform = "translate(-50%, -50%) scale(1)";

    // Random direction and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);

    document.body.appendChild(particle);

    // Animate particle
    particle.style.animation = `heartParticle 1s forwards`;

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        document.body.removeChild(particle);
      }
    }, 1000);
  }

  // Function to create star particles (for future button)
  function createStarParticle(x, y) {
    const particle = document.createElement("div");
    particle.innerHTML = "✨";
    particle.style.position = "fixed";
    particle.style.fontSize = Math.random() * 20 + 15 + "px";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.opacity = "1";
    particle.style.transform = "translate(-50%, -50%) scale(1)";

    document.body.appendChild(particle);

    // Animate particle
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 70;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.animate(
      [
        { opacity: 1, transform: `translate(-50%, -50%) scale(1)` },
        { opacity: 0, transform: `translate(${tx}px, ${ty}px) scale(0)` },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      },
    );

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        document.body.removeChild(particle);
      }
    }, 1000);
  }

  // Function to create confetti
  function createConfetti() {
    const confettiContainer = document.querySelector(".confetti-container");
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 10 + 5 + "px";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

      confettiContainer.appendChild(confetti);

      // Animate confetti
      confetti.animate(
        [
          { opacity: 1, transform: "translateY(0) rotate(0deg)" },
          {
            opacity: 0,
            transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
          },
        ],
        {
          duration: 2000 + Math.random() * 2000,
          delay: Math.random() * 1000,
          easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        },
      );

      // Remove confetti after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confettiContainer.removeChild(confetti);
        }
      }, 4000);
    }
  }

  // Function to create save effect
  function createSaveEffect() {
    const saveEffect = document.createElement("div");
    saveEffect.innerHTML = "💾";
    saveEffect.style.position = "fixed";
    saveEffect.style.fontSize = "2rem";
    saveEffect.style.left = "50%";
    saveEffect.style.top = "50%";
    saveEffect.style.transform = "translate(-50%, -50%)";
    saveEffect.style.zIndex = "10001";
    saveEffect.style.opacity = "0";

    document.body.appendChild(saveEffect);

    // Animate
    saveEffect.animate(
      [
        { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
        { opacity: 1, transform: "translate(-50%, -50%) scale(1.2)" },
        { opacity: 0, transform: "translate(-50%, -100px) scale(0.5)" },
      ],
      {
        duration: 1500,
        easing: "ease-out",
      },
    );

    // Remove after animation
    setTimeout(() => {
      if (saveEffect.parentNode) {
        document.body.removeChild(saveEffect);
      }
    }, 1500);
  }

  // Function to create future popup
  function createFuturePopup() {
    const futurePopup = document.createElement("div");
    futurePopup.className = "future-popup";
    futurePopup.innerHTML = `
            <div class="future-content">
                <div class="gift-close future-close"><i class="fas fa-times"></i></div>
                <h3>Our Future Together</h3>
                <p>Every day with you is a step toward a beautiful future. Let's count down to our next special moments together.</p>
                
                <div class="countdown">
                    <div class="countdown-item">
                        <div class="countdown-number" id="days">00</div>
                        <div class="countdown-label">Days</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-number" id="hours">00</div>
                        <div class="countdown-label">Hours</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-number" id="minutes">00</div>
                        <div class="countdown-label">Minutes</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-number" id="seconds">00</div>
                        <div class="countdown-label">Seconds</div>
                    </div>
                </div>
                
                <p>No matter what the future holds, I know it will be beautiful because you're in it.</p>
                <button class="save-memory-btn" id="saveFutureBtn">
                    <i class="fas fa-calendar-plus"></i> Mark Our Next Date
                </button>
            </div>
        `;

    document.body.appendChild(futurePopup);

    // Add event listeners for future popup
    const futureClose = futurePopup.querySelector(".future-close");
    const saveFutureBtn = futurePopup.querySelector("#saveFutureBtn");

    futureClose.addEventListener("click", function () {
      futurePopup.classList.remove("active");
    });

    saveFutureBtn.addEventListener("click", function () {
      // Set next 5th of the month as the target date
      const now = new Date();
      let nextMonth = now.getMonth() + 1;
      let year = now.getFullYear();

      if (nextMonth > 11) {
        nextMonth = 0;
        year++;
      }

      const next5th = new Date(year, nextMonth, 5);
      localStorage.setItem("nextDate", next5th.toISOString());

      // Update button
      saveFutureBtn.innerHTML = '<i class="fas fa-check"></i> Date Marked!';
      saveFutureBtn.style.background =
        "linear-gradient(135deg, #a8e6cf, #6bcf9c)";

      setTimeout(() => {
        futurePopup.classList.remove("active");
      }, 1500);
    });

    // Close popup when clicking outside
    futurePopup.addEventListener("click", function (e) {
      if (e.target === futurePopup) {
        futurePopup.classList.remove("active");
      }
    });
  }

  // Function to start countdown
  function startCountdown() {
    const now = new Date();

    let targetMonth = now.getMonth();
    let year = now.getFullYear();

    // kalau sudah lewat tanggal 5, pindah ke bulan depan
    if (now.getDate() >= 5) {
      targetMonth++;

      if (targetMonth > 11) {
        targetMonth = 0;
        year++;
      }
    }

    // target tanggal 5 jam 00:00 lokal
    const targetDate = new Date(year, targetMonth, 5, 0, 0, 0, 0);

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    const futurePopup = document.querySelector(".future-popup");

    const observer = new MutationObserver(() => {
      if (!futurePopup.classList.contains("active")) {
        clearInterval(countdownInterval);
        observer.disconnect();
      }
    });

    observer.observe(futurePopup, { attributes: true });
  }

  // Close gift popup when clicking outside
  giftPopup.addEventListener("click", function (e) {
    if (e.target === giftPopup) {
      giftPopup.classList.remove("active");
    }
  });

  // Sticker interaction
  const stickers = document.querySelectorAll(".sticker");
  stickers.forEach((sticker) => {
    sticker.addEventListener("click", function () {
      // Create a floating version of the sticker
      const floatingSticker = document.createElement("div");
      floatingSticker.innerHTML = sticker.innerHTML;
      floatingSticker.style.position = "fixed";
      floatingSticker.style.fontSize = "3rem";
      floatingSticker.style.left = sticker.getBoundingClientRect().left + "px";
      floatingSticker.style.top = sticker.getBoundingClientRect().top + "px";
      floatingSticker.style.zIndex = "10001";
      floatingSticker.style.pointerEvents = "none";

      document.body.appendChild(floatingSticker);

      // Animate to center
      floatingSticker.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(1.5) translateY(-50px)", opacity: 0 },
        ],
        {
          duration: 1500,
          easing: "ease-out",
        },
      );

      // Remove after animation
      setTimeout(() => {
        if (floatingSticker.parentNode) {
          document.body.removeChild(floatingSticker);
        }
      }, 1500);
    });
  });

  // Add gentle floating animation to decorative elements
  const decorativeElements = document.querySelectorAll(
    ".heart-icon, .button-heart, .heart-emoji",
  );
  decorativeElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });

  // Initialize with a few random heart particles
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createHeartParticle(x, y);
      }, i * 200);
    }
  }, 1000);

  // Check if user has visited before
  const firstVisit = !localStorage.getItem("visited");
  if (firstVisit) {
    localStorage.setItem("visited", "true");

    // Show welcome hearts
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createHeartParticle(window.innerWidth / 2, window.innerHeight / 2);
        }, i * 50);
      }
    }, 1000);
  }
});
