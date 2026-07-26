// ============================================
// FINAL SURPRISE - Complete JS
// ============================================

// 🔑 CONFIGURATION
var VIDEO_PASSWORD = "pakhi";
var GOOGLE_DRIVE_FILE_ID = "1u7BUafiZnJqSYJEGWbz05LyIjdS4HJNl";

// গুগল ড্রাইভ লিংক
function getGoogleDriveLink(fileId) {
    return 'https://drive.google.com/file/d/' + fileId + '/view';
}

var POPUP_MESSAGES = [
    { icon: "💕", title: "First Click!", message: "তুমি এত বেশি হট কেন?! 💗" },
    { icon: "❤️", title: "Second Click!", message: "উঁচু করো, একটু খাই😏" },
    { icon: "💖", title: "Third Click!", message: "কেকের কথা বলছিলাম🤣" },
    { icon: "💗", title: "Fourth Click!", message: "তুমি সাজলে পরীর মতো লাগে" },
    { icon: "💝", title: "Fifth Click!", message: "পটাচ্ছি তোমাকে, একটু খেতে দাও না😏 💝" },
    { icon: "💓", title: "Sixth Click!", message: "আচ্ছা, হয়েছে। রাগ করা লাগবে না😁" },
    { icon: "💎", title: "Final Click! 🎉", message: "🎉 Congratulations! এখন নিচের বাটনে ক্লিক করে তোমার সারপ্রাইজ দেখো! 💕" }
];

// ============================================
// VARIABLES
// ============================================
var videoAttempts = 3;
var MAX_VIDEO_ATTEMPTS = 3;
var clickCount = 0;
var MAX_CLICKS = 7;
var isButtonVisible = false;
var isPopupOpen = false;

// ============================================
// PASSWORD UNLOCK
// ============================================
function unlockVideo() {
    var input = document.getElementById('videoPassword');
    var errorMsg = document.getElementById('videoError');
    var btn = document.getElementById('unlockVideoBtn');
    var btnText = btn.querySelector('.btn-text');
    var btnLoader = btn.querySelector('.btn-loader');
    var answer = input.value.trim();

    errorMsg.textContent = '';
    errorMsg.className = 'error-message';
    input.classList.remove('shake-input');

    if (!answer) {
        errorMsg.textContent = '⚠️ Please type the password!';
        input.classList.add('shake-input');
        return;
    }

    if (answer === VIDEO_PASSWORD) {
        errorMsg.textContent = '✅ Correct! Tumi perecho...';
        errorMsg.className = 'error-message success';
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        btn.disabled = true;

        launchConfetti(60);

        setTimeout(function() {
            var lock = document.getElementById('videoLock');
            if (lock) lock.style.display = 'none';

            var container = document.getElementById('btn3dContainer');
            if (container) container.classList.add('show');
            isButtonVisible = true;
            updateClickCounter();
        }, 800);
    } else {
        videoAttempts--;
        updateVideoAttempts();

        if (videoAttempts <= 0) {
            errorMsg.textContent = '❌ Etobar chesta kore parlena!😒';
            input.disabled = true;
            btn.disabled = true;
            return;
        }

        errorMsg.textContent = '❌ Wrong! ' + videoAttempts + ' attempts left. Try again!';
        input.classList.add('shake-input');
        input.value = '';
        input.focus();

        setTimeout(function() {
            input.classList.remove('shake-input');
        }, 400);
    }
}

function updateVideoAttempts() {
    var display = document.getElementById('videoAttempts');
    if (display) {
        var hearts = '';
        for (var i = 0; i < videoAttempts; i++) hearts += '❤️';
        for (var i = 0; i < MAX_VIDEO_ATTEMPTS - videoAttempts; i++) hearts += '🖤';
        display.textContent = hearts + ' ' + videoAttempts + ' attempts left';
    }
}

document.getElementById('videoPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') unlockVideo();
});

// ============================================
// 3D BUTTON LOGIC
// ============================================
function handleButtonClick() {
    if (!isButtonVisible) return;

    clickCount++;
    updateClickCounter();

    var msgIndex = clickCount - 1;
    if (msgIndex < POPUP_MESSAGES.length) {
        showPopup(msgIndex);
    }

    // 7 clicks complete - show Google Drive button
    if (clickCount >= MAX_CLICKS) {
        setTimeout(function() {
            showDriveButton();
            clickCount = 0;
            updateClickCounter();
            var container = document.getElementById('btn3dContainer');
            if (container) container.style.display = 'none';
        }, 600);
    }
}

function updateClickCounter() {
    var counter = document.getElementById('clickCounter');
    if (counter) {
        var remaining = MAX_CLICKS - clickCount;
        if (remaining > 0) {
            counter.textContent = '👆 Click me! (' + clickCount + '/' + MAX_CLICKS + ')';
        } else {
            counter.textContent = '🎉 Almost there!';
        }
    }
}

// ============================================
// SHOW GOOGLE DRIVE BUTTON
// ============================================
function showDriveButton() {
    var container = document.getElementById('driveBtnContainer');
    var driveBtn = document.getElementById('driveBtn');
    
    if (!GOOGLE_DRIVE_FILE_ID || GOOGLE_DRIVE_FILE_ID === "YOUR_VIDEO_FILE_ID_HERE") {
        alert('⚠️ Please add your Google Drive File ID in js/final.js');
        return;
    }

    var driveLink = getGoogleDriveLink(GOOGLE_DRIVE_FILE_ID);
    driveBtn.href = driveLink;
    
    container.classList.add('show');
    launchConfetti(80);
}

// ============================================
// POPUP
// ============================================
function showPopup(index) {
    if (isPopupOpen) return;
    var msg = POPUP_MESSAGES[index];
    if (!msg) return;

    isPopupOpen = true;
    document.getElementById('popupIcon').textContent = msg.icon;
    document.getElementById('popupTitle').textContent = msg.title;
    document.getElementById('popupMessage').textContent = msg.message;

    var overlay = document.getElementById('popupOverlay');
    overlay.classList.add('show');
    launchConfetti(15 + index * 3);
}

function closePopup() {
    document.getElementById('popupOverlay').classList.remove('show');
    isPopupOpen = false;
}

function closePopupOutside(event) {
    if (event.target === event.currentTarget) closePopup();
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
        confetti.style.fontSize = (Math.random() * 10 + 6) + 'px';
        confetti.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.4) + 's';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        container.appendChild(confetti);
        setTimeout(function(el) { if (el.parentNode) el.remove(); }, 3000, confetti);
    }
}

// ============================================
// HEARTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('heartsContainer');
    if (container) {
        var hearts = ['❤️', '💕', '💗', '💖', '💝', '💓'];
        var count = window.innerWidth < 480 ? 15 : 25;
        for (var i = 0; i < count; i++) {
            var heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 14 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 20 + 12) + 's';
            heart.style.animationDelay = (Math.random() * 15) + 's';
            container.appendChild(heart);
        }
    }
});

console.log('💎 Final Surprise Loaded!');
console.log('🔑 Password Hint: "pakhi"');
console.log('📹 Google Drive File ID:', GOOGLE_DRIVE_FILE_ID);