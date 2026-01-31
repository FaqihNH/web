const cursor = document.querySelector('.heart-cursor');
const clickSound = document.getElementById('clickSound');
const overlay = document.querySelector('.detail-overlay');

document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';

    const heart = document.createElement('div');
    heart.className = 'heart-trail';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.innerText = '❤';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
});

/* FRAME CLICK */
document.querySelectorAll('.museum-frame').forEach(frame => {
    frame.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();

        document.getElementById('detailTitle').innerText = frame.dataset.title;
        document.getElementById('detailDate').innerText = frame.dataset.date;
        document.getElementById('detailDesc').innerText = frame.dataset.desc;

        overlay.classList.remove('hidden');

        for (let i = 0; i < 12; i++) {
            spawnHeart();
        }
    });
});

/* CLOSE OVERLAY */
overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

/* HEART BURST */
function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-trail';
    heart.style.left = window.innerWidth / 2 + (Math.random() * 100 - 50) + 'px';
    heart.style.top = window.innerHeight / 2 + (Math.random() * 100 - 50) + 'px';
    heart.innerText = '❤';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}
