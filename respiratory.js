document.addEventListener('DOMContentLoaded', () => {
    const respiratoryValue = document.getElementById('respiratory-value');
    const respiratoryList = document.getElementById('respiratory-list');
    const refreshButton = document.getElementById('refresh-button');

    let respiratoryData = [];

    function updateRespiratoryDisplay() {
        if (respiratoryData.length > 0) {
            const latestRespiratoryRate = respiratoryData[respiratoryData.length - 1];
            respiratoryValue.innerText = `${latestRespiratoryRate} breaths/min`;

            respiratoryList.innerHTML = '';
            respiratoryData.slice().reverse().forEach(rate => {
                const li = document.createElement('li');
                li.textContent = `${rate} breaths/min`;
                respiratoryList.appendChild(li);
            });
        } else {
            respiratoryValue.innerText = 'No data available';
        }
    }

    // Send a GET request to your ESP32 device to fetch the latest respiratory rate data
    async function fetchRespiratoryData() {
        try {
            const response = await fetch('http://your-esp32-device-ip/respiratory');
            const data = await response.json();
            respiratoryData = data;
            updateRespiratoryDisplay();
        } catch (error) {
            console.error('Error fetching respiratory data:', error);
        }
    }

    // Fetch respiratory data on page load and on button click
    fetchRespiratoryData();

    refreshButton.addEventListener('click', fetchRespiratoryData);
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