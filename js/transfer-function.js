

// Get the DOM elements
var colorMapCanvas = document.getElementById('color-map-canvas');
const opacityValue = document.getElementById('opacity-value');
var startSlope1Value = document.getElementById('start-slope1-value');
var endSlope1Value = document.getElementById('end-slope1-value');
var startSlope2Value = document.getElementById('start-slope2-value');
var endSlope2Value = document.getElementById('end-slope2-value');

// Get the 2D drawing context of the canvas
const ctx = colorMapCanvas.getContext('2d');

//tf1 conf variables
let opacity = 1;
let startSlope1 = 0;
let endSlope1 = 0;
let startSlope2 = 0;
let endSlope2 = 0;
let transferFunctionChart;

//Add the listeners
opacityValue.addEventListener('input', function() {
    opacity = parseFloat(opacityValue.value);
    updateTransferFunction();
});
startSlope1Value.addEventListener('input', function() {
    startSlope1 = parseFloat(startSlope1Value.value);
    updateTransferFunction();
});
endSlope1Value.addEventListener('input', function() {
    endSlope1 = parseFloat(endSlope1Value.value);
    updateTransferFunction();
});
startSlope2Value.addEventListener('input', function() {
    startSlope2 = parseFloat(startSlope2Value.value);
    updateTransferFunction();
});
endSlope2Value.addEventListener('input', function() {
    endSlope2 = parseFloat(endSlope2Value.value);
    updateTransferFunction();
});


// Initialize the transfer function color map
function initializeColorMap(minValue, maxValue) {
    // Set initial parameters (adjust these as needed)
    updateOpacity(1);
    updateStartSlope1(minValue);
    updateEndSlope1(maxValue);
    updateStartSlope2(maxValue);
    updateEndSlope2(maxValue);

    let tf1 = [
        {x: startSlope1, y: 0},
        {x: endSlope1, y: opacity},
        {x: startSlope2, y: opacity},
        {x: endSlope2, y: 0},
    ];
    
    let tf1Data = {
        datasets: [
            {
                label: 'Transfer function',
                data: tf1,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'white',
                showLine: true, // Display lines connecting the data points
            },
        ],
    };

    let chartOptions = {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear', // Use linear scaling for the x-axis
                position: 'bottom', // Display x-axis at the bottom
                min: minValue,
                max: maxValue,
                ticks: {
                    color: 'grey', // Set the color of the x-axis ticks
                },
                grid: {
                    color: 'grey', // Set the color of the x-axis grid lines
                },
            },
            y: {
                beginAtZero: true,
                max: 1, // You can adjust the maximum value based on your data.
                ticks: {
                    color: 'grey', // Set the color of the x-axis ticks
                },
                grid: {
                    color: 'grey', // Set the color of the x-axis grid lines
                },
            },
        },
    };

    // Update the chart data with new opacity and slope values
    //transferFunctionChart.update(); // Update the chart
    transferFunctionChart = new Chart(ctx, {
        type: 'line',
        data: tf1Data,
        options: chartOptions,
    });
}

// Update the opacity value
function updateOpacity(newOpacity) {
    opacity = newOpacity;
    opacityValue.value = opacity;
}

// Update the start slope1 value
function updateStartSlope1(newStartSlope) {
    startSlope1 = newStartSlope;
    startSlope1Value.value = startSlope1;
}

// Update the end slope1 value
function updateEndSlope1(newEndSlope) {
    endSlope1 = newEndSlope;
    endSlope1Value.value = endSlope1;
}

// Update the start slope2 value
function updateStartSlope2(newStartSlope) {
    startSlope2 = newStartSlope;
    startSlope2Value.value = startSlope2;
}

// Update the end slope2 value
function updateEndSlope2(newEndSlope) {
    endSlope2 = newEndSlope;
    endSlope2Value.value = endSlope1;
}

// Function to update the transfer function visualization
function updateTransferFunction() {
    let tf1 = [
        {x: startSlope1, y: 0},
        {x: endSlope1, y: opacity},
        {x: startSlope2, y: opacity},
        {x: endSlope2, y: 0},
    ];
    transferFunctionChart.data.datasets[0].data = tf1;
    // You can add more advanced visualization techniques as needed.
    transferFunctionChart.update();
}

export { initializeColorMap };

