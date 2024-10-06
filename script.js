// Chart.js configuration for CO₂ concentration data
const ctx = document.getElementById('co2Chart').getContext('2d');
let co2Chart;

// Function to create a chart with the provided data and country name
function createChart(data, country) {
    if (co2Chart) co2Chart.destroy();  // Destroy previous chart

    co2Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2000', '2005', '2010', '2015', '2020', '2023'],
            datasets: [{
                label: `CO₂ Emissions in ${country} (in parts per million)`,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'CO₂ Emissions (parts per million)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Country-specific CO₂ data
const co2Data = {
    Australia: [367.08, 377.01, 386.35, 397.45, 409.92, 416.47],
    Finland: [360.07, 381.165, 391.94, 402.54, 419.63, 421.46],
    Israel: [371.39, 381.94, 392.02, 403.39, 414.86, 418.77],
    Hungary: [369.55, 379.43, 390.34, 402.75, 412.50, 419.15],
    France: [367.08, 376.931, 386.162, 397.400, 410.058, 416.225],
    UK: [368.01, 378.312, 387.508, 398.591, 411.725, 417.710],
    Greenland: [367.61, 380.09, 389.35, 401.85, 414.60, 420.39],
    Namibia: [367.484, 382.005, 387.125, 398.314, 411.496, 418.535]
};

// Function to update the chart based on the dropdown selection
function updateCountryData() {
    const selectedCountry = document.getElementById("country-dropdown").value;
    let countryTitle = document.getElementById('country-title');

    switch (selectedCountry) {
        case 'Australia':
            countryTitle.innerText = 'CO₂ Emissions in Australia';
            createChart(co2Data.Australia, 'Australia');
            break;
        case 'Finland':
            countryTitle.innerText = 'CO₂ Emissions in Finland';
            createChart(co2Data.Finland, 'Finland');
            break;
        case 'Israel':
            countryTitle.innerText = 'CO₂ Emissions in Israel';
            createChart(co2Data.Israel, 'Israel');
            break;
        case 'Hungary':
            countryTitle.innerText = 'CO₂ Emissions in Hungary';
            createChart(co2Data.Hungary, 'Hungary');
            break;
        case 'France':
            countryTitle.innerText = 'CO₂ Emissions in France';
            createChart(co2Data.France, 'France');
            break; 
        case 'UK':
            countryTitle.innerText = 'CO₂ Emissions in the UK';
            createChart(co2Data.UK, 'UK');
            break; 
        case 'Greenland':
            countryTitle.innerText = 'CO₂ Emissions in Greenland';
            createChart(co2Data.Greenland, 'Greenland');
            break; 
        case 'Namibia':
            countryTitle.innerText = 'CO₂ Emissions in Namibia';
            createChart(co2Data.Namibia, 'Namibia');
            break; 
        default:
            countryTitle.innerText = 'Global CO₂ Emissions';
            if (co2Chart) co2Chart.destroy();  // Clear chart if "none" selected
            break;
    }
}

// Initial call to display global chart
window.onload = () => {
    document.getElementById("country-dropdown").value = "none";
    updateCountryData(); // Call to initialize the chart
};

// Sparkling stars background animation
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');

// Set canvas size
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

// Function to create stars
function createStar(x, y) {
    starCtx.fillStyle = 'rgba(255, 255, 255, 1)';
    starCtx.beginPath();
    starCtx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
    starCtx.fill();
}

// Function to animate stars
function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    
    for (let i = 0; i < 100; i++) {
        createStar(Math.random() * starCanvas.width, Math.random() * starCanvas.height);
    }
    
    // Repeat the animation
    requestAnimationFrame(animateStars);
}

// Start star animation
animateStars();
