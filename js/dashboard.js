// ============================================
// DASHBOARD - Simple
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
});

function createSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;
    
    const colors = ['#D4AF37', '#FF6B9D', '#FFD700', '#FF69B4', '#E8A0BF'];
    
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.width = (Math.random() * 4 + 2) + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.animationDelay = (Math.random() * 5) + 's';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(sparkle);
    }
}