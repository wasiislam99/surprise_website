// ============================================
// MEMORY JAR - Flying Photos with Zoom (Image Load Fix)
// ============================================

// ============================================
// 📸 MEMORY PHOTOS - Edit koro
// ছবি রাখতে হবে: assets/images/memory/ ফোল্ডারে
// ============================================

var MEMORY_PHOTOS = [
    'assets/images/memory/memory1.jpg',
    'assets/images/memory/memory2.jpg',
    'assets/images/memory/memory3.jpg',
    'assets/images/memory/memory4.jpg',
    'assets/images/memory/memory5.jpg',
    'assets/images/memory/memory6.jpg',
    'assets/images/memory/memory7.jpg',
    'assets/images/memory/memory8.jpg'
];

// ============================================
// 🚀 VARIABLES
// ============================================
var isJarOpen = false;
var zoomTimeout = null;
var currentZoomed = null;

// ============================================
// OPEN JAR
// ============================================
function openJar() {
    if (isJarOpen) return;
    isJarOpen = true;

    var wrapper = document.getElementById('jarWrapper');
    var hint = document.getElementById('clickHint');

    // Shake animation
    wrapper.style.animation = 'shake 0.5s ease';
    setTimeout(function() {
        wrapper.style.animation = '';
    }, 600);

    hint.textContent = '✨ Memories flying out!';
    hint.style.color = 'var(--gold)';

    launchPhotos();

    setTimeout(function() {
        isJarOpen = false;
        hint.textContent = '👆 Tap the jar again';
        hint.style.color = '';
    }, 5000);
}

// ============================================
// LAUNCH PHOTOS - FIXED (Image Load)
// ============================================
function launchPhotos() {
    var container = document.getElementById('flyingPhotos');
    if (!container) return;

    // Clear old photos
    container.innerHTML = '';

    // Shuffle photos randomly
    var shuffled = [...MEMORY_PHOTOS].sort(function() {
        return Math.random() - 0.5;
    });

    var count = Math.min(shuffled.length, 8);

    for (var i = 0; i < count; i++) {
        var img = document.createElement('img');
        img.className = 'flying-photo';
        img.src = shuffled[i] + '?t=' + Date.now();
        img.alt = 'Memory ' + (i + 1);
        img.dataset.index = i;
        img.crossOrigin = 'anonymous';
        
        // ✅ Show loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // ✅ Random starting position from center
        var startX = 50 + (Math.random() - 0.5) * 40;
        var startY = 50 + (Math.random() - 0.5) * 40;
        img.style.left = startX + '%';
        img.style.top = startY + '%';

        // Random delay
        img.style.animationDelay = (Math.random() * 0.8) + 's';

        // Random size
        var size = 70 + Math.random() * 50;
        img.style.width = size + 'px';
        img.style.height = size + 'px';

        // Random fly direction
        img.style.setProperty('--tx', (Math.random() - 0.5) * 400 + 'px');
        img.style.setProperty('--ty', (Math.random() - 0.5) * 400 + 'px');

        // ✅ Click to zoom
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            zoomPhoto(this);
        });

        // ✅ IMAGE LOADED - Show image
        img.onload = function() {
            this.style.opacity = '1';
            console.log('Image loaded:', this.src);
        };

        // ✅ IMAGE ERROR - Show placeholder
        img.onerror = function() {
            console.log('Image not found:', this.src);
            this.style.display = 'none';
            var placeholder = document.createElement('div');
            placeholder.className = 'flying-photo';
            placeholder.style.cssText = this.style.cssText;
            placeholder.textContent = ['💕', '❤️', '💖', '💗', '💝', '✨', '🌸'][Math.floor(Math.random() * 7)];
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '32px';
            placeholder.style.background = 'rgba(45, 27, 45, 0.6)';
            placeholder.style.backdropFilter = 'blur(10px)';
            placeholder.style.opacity = '1';
            placeholder.addEventListener('click', function(e) {
                e.stopPropagation();
                zoomPhoto(this);
            });
            if (this.parentNode) {
                this.parentNode.appendChild(placeholder);
            }
            this.remove();
        };

        container.appendChild(img);
    }

    launchConfetti(40);
}

// ============================================
// ZOOM PHOTO
// ============================================
function zoomPhoto(photo) {
    // Clear any existing zoom timeout
    if (zoomTimeout) {
        clearTimeout(zoomTimeout);
        zoomTimeout = null;
    }

    // If there's already a zoomed photo, remove it first
    if (currentZoomed && currentZoomed !== photo) {
        currentZoomed.classList.remove('zoomed');
        currentZoomed.classList.add('zoom-out');
        setTimeout(function() {
            if (currentZoomed.parentNode) currentZoomed.remove();
        }, 400);
    }

    // Toggle zoom on the clicked photo
    if (photo.classList.contains('zoomed')) {
        // If already zoomed, unzoom it
        photo.classList.remove('zoomed');
        photo.classList.add('zoom-out');
        setTimeout(function() {
            if (photo.parentNode) photo.remove();
        }, 400);
        currentZoomed = null;
        return;
    }

    // Remove any existing zoomed photo
    var existingZoomed = document.querySelector('.flying-photo.zoomed');
    if (existingZoomed) {
        existingZoomed.classList.remove('zoomed');
        existingZoomed.classList.add('zoom-out');
        setTimeout(function() {
            if (existingZoomed.parentNode) existingZoomed.remove();
        }, 400);
    }

    // Zoom the clicked photo
    photo.classList.add('zoomed');
    photo.style.pointerEvents = 'auto';
    photo.style.zIndex = '1000';
    photo.style.position = 'fixed';
    photo.style.top = '50%';
    photo.style.left = '50%';
    photo.style.transform = 'translate(-50%, -50%) scale(3)';
    photo.style.width = 'auto';
    photo.style.height = 'auto';
    photo.style.maxWidth = '80vw';
    photo.style.maxHeight = '80vh';
    photo.style.minWidth = '250px';
    photo.style.minHeight = '250px';
    photo.style.objectFit = 'contain';

    currentZoomed = photo;

    // Auto zoom out after 3-4 seconds
    zoomTimeout = setTimeout(function() {
        if (photo && photo.parentNode) {
            photo.classList.remove('zoomed');
            photo.classList.add('zoom-out');
            setTimeout(function() {
                if (photo.parentNode) photo.remove();
            }, 400);
            currentZoomed = null;
        }
        zoomTimeout = null;
    }, 3500 + Math.random() * 500);
}

// ============================================
// SHAKE ANIMATION
// ============================================
var shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        20% { transform: translateX(-15px) rotate(-3deg); }
        40% { transform: translateX(15px) rotate(3deg); }
        60% { transform: translateX(-10px) rotate(-2deg); }
        80% { transform: translateX(10px) rotate(2deg); }
    }
`;
document.head.appendChild(shakeStyle);

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

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createLoveRain();
    createFloatingHearts();
    createSparkles();
});
