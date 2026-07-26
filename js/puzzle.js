// ============================================
// PHOTO PUZZLE - Missing Pieces Game
// ============================================

// ============================================
// 📸 CONFIGURATION
// ============================================
var PUZZLE_IMAGE = 'assets/images/puzzle/puzzle-photo.jpg';
var MISSING_COUNT = 4;
var gridSize = 3;
var totalPieces = 9;

// ============================================
// 🎮 GAME STATE
// ============================================
var missingIndices = [];
var placedPieces = {};
var isGameComplete = false;
var pieceImages = [];
var typingTimeout = null;

// ============================================
// 📝 TYPING MESSAGE - এখানে তোমার মেসেজ লিখো
// ============================================
var LOVE_MESSAGES = [
    "💕 You completed the puzzle! Just like you, every piece of my heart belongs to you!",
    "❤️ Puzzle solved! You are the missing piece that makes my life complete!",
    "💖 You did it! You are my perfect match in every way!",
    "💗 Every piece fits perfectly, just like you fit into my life!",
    "💝 You are the answer to every missing piece of my heart!"
];

// ============================================
// 🎯 INIT GAME
// ============================================
function initGame() {
    var grid = document.getElementById('puzzleGrid');
    var missingContainer = document.getElementById('missingPieces');
    
    grid.innerHTML = '';
    missingContainer.innerHTML = '<span class="missing-label">📦 Missing Pieces</span>';
    
    placedPieces = {};
    isGameComplete = false;
    document.getElementById('winMessage').classList.remove('show');
    document.getElementById('placedCount').textContent = '0 / ' + MISSING_COUNT;
    document.getElementById('placedCount').classList.remove('win');
    
    // Clear typing message if any
    var typingMsg = document.getElementById('typingMessage');
    if (typingMsg) {
        typingMsg.style.display = 'none';
        typingMsg.innerHTML = '';
    }
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    
    // Generate random missing indices
    missingIndices = [];
    var available = [];
    for (var i = 0; i < totalPieces; i++) {
        available.push(i);
    }
    
    for (var i = 0; i < MISSING_COUNT && available.length > 0; i++) {
        var randomIndex = Math.floor(Math.random() * available.length);
        missingIndices.push(available[randomIndex]);
        available.splice(randomIndex, 1);
    }
    
    loadPuzzleImage();
}

// ============================================
// 🖼️ LOAD IMAGE FROM FOLDER
// ============================================
function loadPuzzleImage() {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        createPiecesFromImage(this);
        renderGame();
    };
    img.onerror = function() {
        console.log('Image not found at: ' + PUZZLE_IMAGE);
        console.log('Place your photo at: assets/images/puzzle/puzzle-photo.jpg');
        createEmojiPieces();
        renderGame();
    };
    img.src = PUZZLE_IMAGE + '?t=' + Date.now();
}

// ============================================
// 🧩 CREATE PIECES FROM IMAGE
// ============================================
function createPiecesFromImage(img) {
    var canvas = document.createElement('canvas');
    var pieceSize = 200 / gridSize;
    canvas.width = 200;
    canvas.height = 200;
    var ctx = canvas.getContext('2d');
    
    var size = Math.min(img.width, img.height);
    var sx = (img.width - size) / 2;
    var sy = (img.height - size) / 2;
    ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);
    
    pieceImages = [];
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            var pieceCanvas = document.createElement('canvas');
            pieceCanvas.width = pieceSize;
            pieceCanvas.height = pieceSize;
            var pieceCtx = pieceCanvas.getContext('2d');
            var data = ctx.getImageData(
                col * pieceSize, row * pieceSize,
                pieceSize, pieceSize
            );
            pieceCtx.putImageData(data, 0, 0);
            pieceImages.push(pieceCanvas.toDataURL());
        }
    }
}

// ============================================
// 😊 EMOJI PIECES (Fallback)
// ============================================
function createEmojiPieces() {
    var emojis = ['💕', '❤️', '💖', '💗', '💝', '💓', '💘', '💞', '🌸'];
    pieceImages = [];
    for (var i = 0; i < totalPieces; i++) {
        pieceImages.push(emojis[i % emojis.length]);
    }
}

// ============================================
// 🎨 RENDER GAME
// ============================================
function renderGame() {
    var grid = document.getElementById('puzzleGrid');
    var missingContainer = document.getElementById('missingPieces');
    
    // Clear
    grid.innerHTML = '';
    missingContainer.innerHTML = '<span class="missing-label">📦 Missing Pieces</span>';
    
    // Render grid pieces
    for (var i = 0; i < totalPieces; i++) {
        var piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.index = i;
        piece.id = 'grid-piece-' + i;
        
        var isMissing = missingIndices.indexOf(i) !== -1;
        var isPlaced = placedPieces[i] === true;
        
        if (isMissing && !isPlaced) {
            piece.classList.add('empty');
            piece.innerHTML = '<span class="piece-number">' + (i + 1) + '</span><span class="piece-emoji">❓</span>';
        } else {
            if (isPlaced) {
                piece.classList.add('placed');
            }
            if (typeof pieceImages[i] === 'string' && pieceImages[i].startsWith('data:image')) {
                piece.innerHTML = '<img src="' + pieceImages[i] + '" alt="Piece ' + (i + 1) + '" /><span class="piece-number">' + (i + 1) + '</span>';
            } else {
                piece.textContent = pieceImages[i] || '❓';
            }
        }
        
        // Click event
        piece.addEventListener('click', function() {
            var targetIndex = parseInt(this.dataset.index);
            if (this.classList.contains('empty')) {
                var missingPieces = document.querySelectorAll('.missing-piece');
                for (var m = 0; m < missingPieces.length; m++) {
                    if (parseInt(missingPieces[m].dataset.index) === targetIndex) {
                        placePiece(targetIndex);
                        break;
                    }
                }
            }
        });
        
        // Drag drop events
        piece.addEventListener('dragover', function(e) { e.preventDefault(); });
        piece.addEventListener('drop', function(e) {
            e.preventDefault();
            var index = parseInt(e.dataTransfer.getData('text/plain'));
            var targetIndex = parseInt(this.dataset.index);
            if (this.classList.contains('empty') && missingIndices.indexOf(targetIndex) !== -1) {
                if (index === targetIndex) {
                    placePiece(index);
                }
            }
        });
        
        grid.appendChild(piece);
    }
    
    // Render missing pieces
    var missingPiecesList = [];
    for (var i = 0; i < missingIndices.length; i++) {
        var idx = missingIndices[i];
        if (placedPieces[idx] !== true) {
            missingPiecesList.push(idx);
        }
    }
    
    shuffleArray(missingPiecesList);
    
    for (var i = 0; i < missingPiecesList.length; i++) {
        var idx = missingPiecesList[i];
        var piece = document.createElement('div');
        piece.className = 'missing-piece';
        piece.dataset.index = idx;
        piece.id = 'missing-piece-' + idx;
        piece.draggable = true;
        
        if (typeof pieceImages[idx] === 'string' && pieceImages[idx].startsWith('data:image')) {
            piece.innerHTML = '<img src="' + pieceImages[idx] + '" alt="Piece ' + (idx + 1) + '" />';
        } else {
            piece.textContent = pieceImages[idx] || '❓';
        }
        
        piece.addEventListener('click', function() {
            var index = parseInt(this.dataset.index);
            var gridPiece = document.getElementById('grid-piece-' + index);
            if (gridPiece && gridPiece.classList.contains('empty')) {
                placePiece(index);
            } else {
                if (gridPiece) {
                    gridPiece.style.borderColor = '#FF6B6B';
                    gridPiece.style.background = 'rgba(255,107,107,0.1)';
                    setTimeout(function() {
                        gridPiece.style.borderColor = '';
                        gridPiece.style.background = '';
                    }, 1000);
                }
            }
        });
        
        piece.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.index);
            this.style.opacity = '0.5';
        });
        piece.addEventListener('dragend', function(e) {
            this.style.opacity = '1';
        });
        
        missingContainer.appendChild(piece);
    }
    
    updateStatus();
}

// ============================================
// 📍 PLACE PIECE
// ============================================
function placePiece(index) {
    if (placedPieces[index] === true) return;
    if (isGameComplete) return;
    
    placedPieces[index] = true;
    
    var missingPiece = document.getElementById('missing-piece-' + index);
    if (missingPiece) {
        missingPiece.classList.add('placed');
        missingPiece.style.display = 'none';
    }
    
    renderGame();
    updateStatus();
    
    // Check win
    var placed = Object.keys(placedPieces).length;
    if (placed === missingIndices.length) {
        isGameComplete = true;
        document.getElementById('winMessage').classList.add('show');
        document.getElementById('placedCount').classList.add('win');
        launchConfetti(100);
        
        // ✅ Show typing message after confetti
        setTimeout(function() {
            showTypingMessage();
        }, 800);
    }
}

// ============================================
// 📝 SHOW TYPING MESSAGE - NEW!
// ============================================
function showTypingMessage() {
    var container = document.getElementById('winMessage');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    container.classList.add('show');
    
    // Random message
    var randomIndex = Math.floor(Math.random() * LOVE_MESSAGES.length);
    var fullMessage = LOVE_MESSAGES[randomIndex];
    
    // Create typing container
    var typingDiv = document.createElement('div');
    typingDiv.className = 'typing-container';
    typingDiv.style.cssText = 'text-align:center;padding:8px;';
    
    var emojiSpan = document.createElement('span');
    emojiSpan.className = 'win-emoji';
    emojiSpan.textContent = '💖';
    emojiSpan.style.cssText = 'font-size:36px;display:block;margin-bottom:4px;';
    typingDiv.appendChild(emojiSpan);
    
    var textSpan = document.createElement('span');
    textSpan.className = 'typing-text';
    textSpan.style.cssText = 'font-size:17px;font-weight:400;color:#4CAF50;line-height:1.6;';
    typingDiv.appendChild(textSpan);
    
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    cursor.style.cssText = 'display:inline-block;animation:blink 0.8s step-end infinite;color:#4CAF50;font-weight:300;';
    typingDiv.appendChild(cursor);
    
    container.appendChild(typingDiv);
    
    // Add blink animation if not exists
    var styleExists = document.getElementById('typingStyle');
    if (!styleExists) {
        var style = document.createElement('style');
        style.id = 'typingStyle';
        style.textContent = '@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }';
        document.head.appendChild(style);
    }
    
    // Start typing
    var index = 0;
    textSpan.textContent = '';
    
    function typeChar() {
        if (index < fullMessage.length) {
            var char = fullMessage.charAt(index);
            textSpan.textContent += char;
            index++;
            var speed = 20 + Math.random() * 25;
            typingTimeout = setTimeout(typeChar, speed);
        } else {
            // Remove cursor
            if (cursor) cursor.style.display = 'none';
            
            // Add a small heart after typing
            setTimeout(function() {
                var heart = document.createElement('span');
                heart.textContent = ' 💕';
                heart.style.cssText = 'display:inline-block;animation:heartBeat 1.5s ease-in-out infinite;';
                textSpan.appendChild(heart);
                
                // Add heartbeat style
                var heartStyle = document.createElement('style');
                heartStyle.textContent = '@keyframes heartBeat { 0%,100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }';
                document.head.appendChild(heartStyle);
            }, 300);
        }
    }
    
    typingTimeout = setTimeout(typeChar, 600);
}

// ============================================
// 📊 UPDATE STATUS
// ============================================
function updateStatus() {
    var placed = Object.keys(placedPieces).length;
    document.getElementById('placedCount').textContent = placed + ' / ' + missingIndices.length;
}

// ============================================
// 🔀 SHUFFLE
// ============================================
function shufflePieces() {
    if (isGameComplete) return;
    
    // Clear typing message
    var typingMsg = document.getElementById('typingMessage');
    if (typingMsg) {
        typingMsg.style.display = 'none';
        typingMsg.innerHTML = '';
    }
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    
    placedPieces = {};
    shuffleArray(missingIndices);
    renderGame();
    updateStatus();
    document.getElementById('winMessage').classList.remove('show');
    document.getElementById('placedCount').classList.remove('win');
}

// ============================================
// 🔄 RESET
// ============================================
function resetGame() {
    // Clear typing message
    var typingMsg = document.getElementById('typingMessage');
    if (typingMsg) {
        typingMsg.style.display = 'none';
        typingMsg.innerHTML = '';
    }
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    
    placedPieces = {};
    isGameComplete = false;
    document.getElementById('winMessage').classList.remove('show');
    document.getElementById('placedCount').classList.remove('win');
    
    var available = [];
    for (var i = 0; i < totalPieces; i++) {
        available.push(i);
    }
    missingIndices = [];
    for (var i = 0; i < MISSING_COUNT && available.length > 0; i++) {
        var randomIndex = Math.floor(Math.random() * available.length);
        missingIndices.push(available[randomIndex]);
        available.splice(randomIndex, 1);
    }
    
    renderGame();
    updateStatus();
}

// ============================================
// 🔧 UTILITIES
// ============================================
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// ============================================
// 💥 CONFETTI
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
        setTimeout(function(el) { if (el.parentNode) el.remove(); }, 4000, confetti);
    }
}

// ============================================
// 🎬 LOVE RAIN, HEARTS, SPARKLES
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
// 🚀 INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createLoveRain();
    createFloatingHearts();
    createSparkles();
    initGame();
});