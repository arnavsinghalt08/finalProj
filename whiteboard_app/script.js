window.addEventListener('load', () => {
    // --- Get DOM Elements ---
    const canvas = document.getElementById('whiteboard');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const brushSizeSlider = document.getElementById('brush-size');
    const clearButton = document.getElementById('clear-btn');

    //Establish the drawing context
    const ctx = canvas.getContext('2d');

    // --- State ---
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function setDefaultCanvasSettings(){
        // Set properties for smooth lines
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Set properties from the UI controls
        ctx.lineWidth = brushSizeSlider.value;
        ctx.strokeStyle = document.querySelector('.color-swatch.active').dataset.color;
    }

    function handleColorClick(e){
        // Remove 'active' class from all swatches
        colorSwatches.forEach(swatch => swatch.classList.remove('active'));

        // Add 'active' class to the clicked swatch
        const clickedSwatch = e.target;
        clickedSwatch.classList.add('active');

        // Update drawing color
        ctx.strokeStyle = clickedSwatch.dataset.color;
    }

    function handleBrushSizeChange(e){
        ctx.lineWidth = e.target.value;
    }

    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function startDrawing(e){
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing(){
        isDrawing = false;
    }

    function draw(e){
        if (!isDrawing) return; // Stop if not drawing

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);       // Start from last point
        ctx.lineTo(e.offsetX, e.offsetY); // Go to current point
        ctx.stroke();                   // Draw the line

        // Update last coordinates for the next segment
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function resizeCanvas(){
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = window.innerHeight * 0.6; // Set height to 60% of viewport height
        setDefaultCanvasSettings();
    }

    
    // Call the resize canvas function
    resizeCanvas();

    // Add a mousedown event listener to the canvas to call startDrawing
    canvas.addEventListener('mousedown', startDrawing);
    // Add a mousemove event listener to the canvas to call draw
    canvas.addEventListener('mousemove', draw);
    // Add a mouseup event listener to the canvas to call stopDrawing
    canvas.addEventListener('mouseup', stopDrawing);
    // Add a mouseout event listener to the canvas to call stopDrawing
    canvas.addEventListener('mouseout', stopDrawing);

    // Loop through the color swatches and add a click event listener to each which calls handleColorClick
    colorSwatches.forEach(swatch => swatch.addEventListener('click', handleColorClick));
    // Add an event listener for 'input' to brushSizeSlider which calls handleBrushSizeChange
    brushSizeSlider.addEventListener('input', handleBrushSizeChange);
    // Add an event listener for 'click' to clearButton which calls clearCanvas
    clearButton.addEventListener('click', clearCanvas);

    // Add an event listener for 'resize' to the window to call the resizeCanvas function
    window.addEventListener('resize', resizeCanvas);

}); 