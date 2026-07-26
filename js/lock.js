// ============================================
// LOCK SCREEN - Password Logic
// ============================================

const SECRET_ANSWER = "ayva"; // ← CHANGE THIS
const QUESTION = "Amar shobtheke kacher manush ke?";
const HINT = "kono hint dibona tumi guess  koro?";

let attempts = 3;
const MAX_ATTEMPTS = 3;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('questionDisplay').textContent = QUESTION;
    document.getElementById('hintText').textContent = HINT;
    updateAttemptsDisplay();
    createFloatingHearts();
    
    setTimeout(() => {
        document.getElementById('answerInput').focus();
    }, 500);
});

function unlockDoor() {
    const input = document.getElementById('answerInput');
    const errorMsg = document.getElementById('errorMsg');
    const btn = document.getElementById('unlockBtn');
    const answer = input.value.trim().toLowerCase();
    
    errorMsg.textContent = '';
    errorMsg.className = 'error-message';
    input.classList.remove('shake-input');
    
    if (!answer) {
        errorMsg.textContent = '⚠️ Please type your answer first!';
        input.classList.add('shake-input');
        return;
    }
    
    if (answer === SECRET_ANSWER) {
        errorMsg.textContent = '✅ Correct! Unlocking...';
        errorMsg.className = 'error-message success';
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-loader"></span> Unlocking...';
        
        launchConfetti(80);
        
        setTimeout(() => {
            window.location.href = 'giftbox.html';
        }, 1500);
    } else {
        attempts--;
        updateAttemptsDisplay();
        
        if (attempts <= 0) {
            errorMsg.textContent = '❌ Allah 3 barew parlena!😱 Hint: ' + HINT;
            input.disabled = true;
            btn.disabled = true;
            return;
        }
        
        errorMsg.textContent = `❌ Wrong! ${attempts} attempts left. Try again!`;
        input.classList.add('shake-input');
        input.value = '';
        input.focus();
        
        setTimeout(() => {
            input.classList.remove('shake-input');
        }, 500);
    }
}

function updateAttemptsDisplay() {
    const display = document.getElementById('attemptsDisplay');
    if (!display) {
        // Create attempts display if not exists
        const container = document.querySelector('.question-box');
        const div = document.createElement('div');
        div.className = 'attempts-counter';
        div.id = 'attemptsDisplay';
        container.appendChild(div);
    }
    const el = document.getElementById('attemptsDisplay');
    if (el) {
        const hearts = '❤️'.repeat(attempts) + '🖤'.repeat(MAX_ATTEMPTS - attempts);
        el.textContent = `${hearts} ${attempts} attempts left`;
    }
}

document.getElementById('answerInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') unlockDoor();
});

// ============================================
// FLOATING HEARTS
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    const hearts = ['❤️', '💕', '💗', '💖', '💝', '💓'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 25 + 15) + 's';
        heart.style.animationDelay = (Math.random() * 20) + 's';
        container.appendChild(heart);
    }
}

// ============================================
// CONFETTI
// ============================================
function launchConfetti(count = 50) {
    let container = document.getElementById('confettiContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'confettiContainer';
        container.style.cssText = `
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        
        const style = document.createElement('style');
        style.textContent = `
            .confetti-piece {
                position: absolute;
                top: -10px;
                animation: confettiFall linear forwards;
            }
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    const colors = ['#FF6B9D', '#D4AF37', '#FFB6C1', '#FFD700', '#FF69B4', '#E8A0BF', '#FF1493'];
    const shapes = ['■', '●', '▲', '★', '♦', '♥'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (Math.random() * 14 + 8) + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) confetti.remove();
        }, 4000);
    }
}