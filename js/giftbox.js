// ============================================
// GIFT BOX - Premium + Love Rain
// ============================================

var isOpened = false;

// ============================================
// LOVE RAIN
// ============================================
function createLoveRain() {
    var container = document.getElementById('loveRain');
    if (!container) return;
    
    var symbols = ['💕', '❤️', '💖', '💗', '💝', '✨', '🌸'];
    
    for (var i = 0; i < 40; i++) {
        var drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        drop.style.left = Math.random() * 100 + '%';
        drop.style.fontSize = (Math.random() * 14 + 10) + 'px';
        drop.style.animationDuration = (Math.random() * 8 + 5) + 's';
        drop.style.animationDelay = (Math.random() * 10) + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(drop);
    }
}

// ============================================
// OPEN GIFT BOX
// ============================================
function openGift() {
    if (isOpened) return;
    isOpened = true;

    var box = document.getElementById('giftBox3d');
    var boxContainer = document.getElementById('giftBoxContainer');
    var hint = document.getElementById('clickHint');
    var letter = document.getElementById('letterContainer');

    // Popup Effect
    box.classList.add('popup');

    // Open Lid
    setTimeout(function() {
        box.classList.add('opened');
        box.style.animation = 'none';
    }, 400);

    // Hide hint
    setTimeout(function() {
        hint.style.display = 'none';
    }, 600);

    // Show letter
    setTimeout(function() {
        letter.classList.add('show');
        startTyping();
    }, 1000);

    // Fade out box
    setTimeout(function() {
        boxContainer.classList.add('fade-out');
    }, 1800);

    launchConfetti(80);
}

// ============================================
// TYPING LETTER
// ============================================
function startTyping() {
    var text = '💕 প্রিয় আইভা,\n\nআমার জীবনের সবচেয়ে সুন্দর উপহার তুমি। তোমার সাথে আমার প্রতিটি মুহূর্ত আমার কাছে অমূল্য। তোমার হাসি, তোমার ভালোবাসা, তোমার স্পর্শ—এগুলোই আমার জীবনের সবচেয়ে বড় সম্পদ।\n\nতুমি না থাকলে আমার জীবন অসম্পূর্ণ থাকতো। আমি তোমাকে যতটুকু ভালোবাসি, তা ভাষায় প্রকাশ করা সম্ভব নয়। তুমি আমার পৃথিবী, আমার আকাশ, আমার সবকিছু।\n\nশুভ জন্মদিন, আমার ভালোবাসা। তোমার জন্য আমার ভালোবাসা চিরকাল থাকবে। 💕\n\nসবসময় তোমার,\nতোমার ওয়াসি ❤️';

    var element = document.getElementById('letterText');
    var index = 0;
    element.textContent = '';

    function typeChar() {
        if (index < text.length) {
            var char = text.charAt(index);
            if (char === '\n') {
                element.textContent += '\n';
            } else {
                element.textContent += char;
            }
            index++;
            setTimeout(typeChar, 35);
        } else {
            var nextBtn = document.getElementById('nextBtn');
            if (nextBtn) {
                nextBtn.style.display = 'inline-block';
            }
            var cursor = document.querySelector('.cursor');
            if (cursor) cursor.style.display = 'none';
            launchConfetti(50);
        }
    }

    setTimeout(typeChar, 500);
}

// ============================================
// GO TO DASHBOARD
// ============================================
function goToDashboard() {
    localStorage.setItem('giftbox_opened', 'true');
    window.location.href = 'dashboard.html';
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Love Rain
    createLoveRain();
    
    // Floating Hearts
    var container = document.getElementById('heartsContainer');
    if (container) {
        var hearts = ['❤️', '💕', '💗', '💖', '💝', '💓'];
        for (var i = 0; i < 25; i++) {
            var heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
            heart.style.animationDuration = (Math.random() * 25 + 15) + 's';
            heart.style.animationDelay = (Math.random() * 20) + 's';
            container.appendChild(heart);
        }
    }

    // Sparkles
    var sparkles = document.getElementById('sparklesBg');
    if (sparkles) {
        for (var i = 0; i < 40; i++) {
            var dot = document.createElement('div');
            dot.className = 'sparkle-dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.width = (Math.random() * 3 + 2) + 'px';
            dot.style.height = dot.style.width;
            dot.style.animationDuration = (Math.random() * 15 + 10) + 's';
            dot.style.animationDelay = (Math.random() * 15) + 's';
            dot.style.opacity = Math.random() * 0.4 + 0.1;
            sparkles.appendChild(dot);
        }
    }
});

// ============================================
// CONFETTI
// ============================================
function launchConfetti(count) {
    count = count || 50;
    var container = document.getElementById('confettiContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'confettiContainer';
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
        document.body.appendChild(container);

        var style = document.createElement('style');
        style.textContent = '.confetti-piece{position:absolute;top:-10px;animation:confettiFall linear forwards;}@keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(110vh) rotate(720deg);opacity:0;}}';
        document.head.appendChild(style);
    }

    var colors = ['#FF6B9D', '#D4AF37', '#FFB6C1', '#FFD700', '#FF69B4', '#E8A0BF', '#FF1493'];
    var shapes = ['■', '●', '▲', '★', '♦', '♥'];

    for (var i = 0; i < count; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (Math.random() * 14 + 8) + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        container.appendChild(confetti);

        setTimeout(function(el) {
            if (el.parentNode) el.remove();
        }, 4000, confetti);
    }
}