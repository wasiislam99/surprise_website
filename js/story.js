// ============================================
// OUR STORY - Complete Working
// ============================================

// ============================================
// 📝 STORY TEXT - এখানে তোমার গল্প লিখো
// ============================================
var STORY_TEXT = `💕 যেদিন আমাদের দেখা হয়েছিল, সেদিন থেকেই আমার পৃথিবী চিরতরে বদলে গেছে।

আজও স্পষ্ট মনে আছে, প্রথম যখন তোমাকে দেখেছিলাম—সময় যেন থমকে দাঁড়িয়েছিল, চারপাশের সবকিছু হারিয়ে গিয়েছিল, আর আমার চোখে তখন শুধু তুমিই ছিলে। 🌹

প্রথম দেখাতেই বুঝেছিলাম, তুমি সত্যিই বিশেষ একজন। তোমার সঙ্গে কাটানো প্রতিটি মুহূর্ত আমাদের ভালোবাসার গল্পে এক একটি সুন্দর, স্মরণীয় অধ্যায় হয়ে আছে। 

তুমিই আমার জীবনের সূর্যের উষ্ণতা, চাঁদের প্রশান্তি আর আকাশভরা তারার ঝলকানি। তোমার হাত ধরে আমাদের ভালোবাসার গল্পে আরও অসংখ্য সুন্দর অধ্যায় যোগ করার অপেক্ষায় আছি। 💖

আমি তোমায় ভীষণ ভালোবাসি!  💕`;

// ============================================
// LOVE RAIN
// ============================================
function createLoveRain() {
    var container = document.getElementById('loveRain');
    if (!container) return;
    
    var symbols = ['💕', '❤️', '💖', '💗', '💝', '✨', '🌸'];
    
    for (var i = 0; i < 35; i++) {
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
// BEAUTIFUL TYPING ANIMATION
// ============================================
function startTyping() {
    var element = document.getElementById('storyText');
    if (!element) return;

    var text = STORY_TEXT;
    var charIndex = 0;
    element.textContent = '';

    function typeChar() {
        if (charIndex < text.length) {
            var char = text.charAt(charIndex);
            
            if (char === '\n') {
                element.textContent += '\n';
            } else {
                element.textContent += char;
            }
            
            charIndex++;
            var speed = 25 + Math.random() * 20;
            setTimeout(typeChar, speed);
        } else {
            var cursor = document.querySelector('.cursor');
            if (cursor) {
                setTimeout(function() {
                    cursor.style.display = 'none';
                }, 500);
            }
        }
    }

    setTimeout(typeChar, 500);
}

// ============================================
// FLOATING HEARTS
// ============================================
function createFloatingHearts() {
    var container = document.getElementById('heartsContainer');
    if (!container) return;

    var hearts = ['❤️', '💕', '💗', '💖', '💝', '💓'];
    for (var i = 0; i < 25; i++) {
        var heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 18 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 25 + 15) + 's';
        heart.style.animationDelay = (Math.random() * 20) + 's';
        container.appendChild(heart);
    }
}

// ============================================
// SPARKLES
// ============================================
function createSparkles() {
    var container = document.getElementById('sparklesBg');
    if (!container) return;

    for (var i = 0; i < 40; i++) {
        var dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.width = (Math.random() * 3 + 2) + 'px';
        dot.style.height = dot.style.width;
        dot.style.animationDuration = (Math.random() * 15 + 10) + 's';
        dot.style.animationDelay = (Math.random() * 15) + 's';
        dot.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(dot);
    }
}

// ============================================
// IMAGE AUTO FIT
// ============================================
function autoFitImages() {
    var images = document.querySelectorAll('.photo-item img');
    images.forEach(function(img) {
        img.onload = function() {
            var parent = this.parentElement;
            var aspectRatio = this.naturalWidth / this.naturalHeight;
            
            parent.classList.remove('tall', 'wide', 'square');
            
            if (aspectRatio > 1.5) {
                parent.classList.add('wide');
            } else if (aspectRatio < 0.8) {
                parent.classList.add('tall');
            } else {
                parent.classList.add('square');
            }
        };
        
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createLoveRain();
    createFloatingHearts();
    createSparkles();
    startTyping();
    autoFitImages();
});

// ============================================
// CONFETTI
// ============================================
function launchConfetti(count) {
    count = count || 30;
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

    var colors = ['#FF6B9D', '#D4AF37', '#FFB6C1', '#FFD700', '#FF69B4', '#E8A0BF'];
    var shapes = ['■', '●', '▲', '★', '♦', '♥'];

    for (var i = 0; i < count; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (Math.random() * 12 + 8) + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        container.appendChild(confetti);

        setTimeout(function(el) {
            if (el.parentNode) el.remove();
        }, 4000, confetti);
    }
}