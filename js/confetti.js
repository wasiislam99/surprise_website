// ============================================
// 🎊 CONFETTI - Celebration Effect
// ============================================

// ============================================
// MAIN CONFETTI FUNCTION
// ============================================
function launchConfetti(count) {
    // Default count 50, যদি না দেওয়া হয়
    count = count || 50;
    
    // Container তৈরি বা খুঁজে বের করা
    var container = document.getElementById('confettiContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'confettiContainer';
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
        document.body.appendChild(container);
        
        // CSS যোগ করা
        var style = document.createElement('style');
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
    
    // রঙ এবং শেপ
    var colors = ['#FF6B9D', '#D4AF37', '#FFB6C1', '#FFD700', '#FF69B4', '#E8A0BF', '#FF1493', '#FF4500', '#00CED1', '#7B68EE'];
    var shapes = ['■', '●', '▲', '★', '♦', '♥', '✦', '✿'];
    
    // প্রতিটি confetti তৈরি করা
    for (var i = 0; i < count; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // র‍্যান্ডম শেপ
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        
        // র‍্যান্ডম পজিশন
        confetti.style.left = Math.random() * 100 + '%';
        
        // র‍্যান্ডম রঙ
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // র‍্যান্ডম সাইজ
        confetti.style.fontSize = (Math.random() * 18 + 8) + 'px';
        
        // র‍্যান্ডম স্পিড (ডিউরেশন)
        confetti.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's';
        
        // র‍্যান্ডম ডিলে
        confetti.style.animationDelay = (Math.random() * 0.8) + 's';
        
        // র‍্যান্ডম রোটেশন
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        
        // কখনো শুধু কালার ফ্লেক (টেক্সট ছাড়া)
        if (Math.random() > 0.5) {
            confetti.textContent = '';
            confetti.style.width = (Math.random() * 8 + 4) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
        
        container.appendChild(confetti);
        
        // ৪ সেকেন্ড পর remove করা
        setTimeout(function(el) {
            if (el.parentNode) el.remove();
        }, 4000, confetti);
    }
}

// ============================================
// 🎊 BURST CONFETTI - Multiple Bursts
// ============================================
function birthdayConfettiBurst() {
    // ৫ বার কনফেটি ছাড়ানো (একটু পর পর)
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            launchConfetti(50 + Math.random() * 50);
        }, i * 300);
    }
}

// ============================================
// 🎊 HEAVY CONFETTI - Big Celebration
// ============================================
function megaConfetti() {
    // ১০ বার কনফেটি ছাড়ানো
    for (var i = 0; i < 10; i++) {
        setTimeout(function() {
            launchConfetti(60 + Math.random() * 60);
        }, i * 200);
    }
}

// ============================================
// 🎊 CONFETTI ON PAGE LOAD (Optional)
// ============================================
// পেইজ লোড হলে ছোট কনফেটি
document.addEventListener('DOMContentLoaded', function() {
    // ১ সেকেন্ড পর
    setTimeout(function() {
        launchConfetti(30);
    }, 1000);
    
    // ৩ সেকেন্ড পর
    setTimeout(function() {
        launchConfetti(20);
    }, 3000);
});