window.addEventListener('load', () => {
    const WORDS = [
        'cat', 'dog', 'house', 'tree', 'sun', 'car', 'boat', 'fish',
        'bird', 'flower', 'mountain', 'star', 'moon', 'apple', 'banana',
        'bicycle', 'airplane', 'rainbow', 'cloud', 'umbrella', 'pizza',
        'cake', 'hat', 'clock', 'key', 'heart', 'crown', 'snail',
        'elephant', 'guitar', 'book', 'glasses', 'shoe', 'chair', 'lamp',
        'rocket', 'castle', 'dragon', 'penguin', 'cactus', 'lighthouse'
    ];

    const canvas = document.getElementById('whiteboard');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const brushSizeSlider = document.getElementById('brush-size');
    const clearButton = document.getElementById('clear-btn');
    const promptWord = document.getElementById('prompt-word');
    const newWordBtn = document.getElementById('new-word-btn');
    const guessBtn = document.getElementById('guess-btn');
    const resultPanel = document.getElementById('result-panel');
    const resultContent = document.getElementById('result-content');

    const ctx = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentWord = '';

    function pickRandomWord() {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        currentWord = word;
        promptWord.textContent = word.charAt(0).toUpperCase() + word.slice(1);
        resultPanel.classList.remove('visible', 'success', 'fail');
        clearCanvas();
    }

    function setDefaultCanvasSettings() {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = brushSizeSlider.value;
        ctx.strokeStyle = document.querySelector('.color-swatch.active').dataset.color;
    }

    function handleColorClick(e) {
        colorSwatches.forEach(swatch => swatch.classList.remove('active'));
        e.target.classList.add('active');
        ctx.strokeStyle = e.target.dataset.color;
    }

    function handleBrushSizeChange(e) {
        ctx.lineWidth = e.target.value;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = window.innerHeight * 0.55;
        setDefaultCanvasSettings();
    }

    async function submitGuess() {
        guessBtn.disabled = true;
        guessBtn.textContent = '🤔 Thinking…';
        resultPanel.classList.remove('visible', 'success', 'fail');

        // Scale down the canvas to reduce payload size before sending
        const small = document.createElement('canvas');
        small.width = 400;
        small.height = 300;
        const sCtx = small.getContext('2d');
        sCtx.fillStyle = '#ffffff';
        sCtx.fillRect(0, 0, 400, 300);
        sCtx.drawImage(canvas, 0, 0, 400, 300);

        const imageData = small.toDataURL('image/png');

        try {
            const res = await fetch('/api/guess-drawing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageData })
            });

            if (!res.ok) throw new Error('Server error');

            const { guess } = await res.json();

            const matched =
                guess.toLowerCase().includes(currentWord.toLowerCase()) ||
                currentWord.toLowerCase().includes(guess.toLowerCase());

            resultPanel.classList.add('visible', matched ? 'success' : 'fail');
            resultContent.innerHTML = matched
                ? `✅ <strong>Correct!</strong> The AI guessed "<em>${guess}</em>" — nice drawing!`
                : `🤖 The AI guessed: <strong>"${guess}"</strong><br><small>The word was: <em>${currentWord}</em></small>`;
        } catch {
            resultPanel.classList.add('visible', 'fail');
            resultContent.innerHTML = '❌ Something went wrong. Try again!';
        }

        guessBtn.disabled = false;
        guessBtn.textContent = '🤖 Let AI Guess!';
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    colorSwatches.forEach(s => s.addEventListener('click', handleColorClick));
    brushSizeSlider.addEventListener('input', handleBrushSizeChange);
    clearButton.addEventListener('click', clearCanvas);
    newWordBtn.addEventListener('click', pickRandomWord);
    guessBtn.addEventListener('click', submitGuess);

    pickRandomWord();
});
