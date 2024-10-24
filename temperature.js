document.addEventListener('DOMContentLoaded', () => {
    const temperatureValue = document.getElementById('temperature-value');
    const temperatureList = document.getElementById('temperature-list');
    const refreshButton = document.getElementById('refresh-button');

    let temperatureData = [];

    function updateTemperatureDisplay() {
        if (temperatureData.length > 0) {
            const latestTemperature = temperatureData[temperatureData.length - 1];
            temperatureValue.innerText = `${latestTemperature} °C`;

            temperatureList.innerHTML = '';
            temperatureData.slice().reverse().forEach(temp => {
                const li = document.createElement('li');
                li.textContent = `${temp} °C`;
                 temperatureList.appendChild(li);
            });
        } else {
            temperatureValue.innerText = 'No data available';
        }
    }

    // Send a GET request to your ESP32 device to fetch the latest temperature data
    async function fetchTemperatureData() {
        try {
            const response = await fetch('http://your-esp32-device-ip/temperature');
            const data = await response.json();
            temperatureData = data;
            updateTemperatureDisplay();
        } catch (error) {
            console.error('Error fetching temperature data:', error);
        }
    }

    // Fetch temperature data on page load and on button click
    fetchTemperatureData();

    refreshButton.addEventListener('click', fetchTemperatureData);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

refreshButton.addEventListener('click', () => {
    fetchData(); // Your existing fetch function (e.g., fetchTemperatureData, fetchPulseData, fetchRespiratoryData)
    scrollToTop();
});

document.addEventListener('DOMContentLoaded', function() {
    // Your existing JavaScript code

    // Example function for smooth scrolling to sections (if needed)
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Other existing functions
});