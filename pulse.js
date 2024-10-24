document.addEventListener('DOMContentLoaded', () => {
    const pulseValue = document.getElementById('pulse-value');
    const pulseList = document.getElementById('pulse-list');
    const refreshButton = document.getElementById('refresh-button');

    let pulseData = [];

    function updatePulseDisplay() {
        if (pulseData.length > 0) {
            const latestPulse = pulseData[pulseData.length - 1];
            pulseValue.innerText = `${latestPulse} BPM`;

            pulseList.innerHTML = '';
            pulseData.slice().reverse().forEach(pulse => {
                const li = document.createElement('li');
                li.textContent = `${pulse} BPM`;
                pulseList.appendChild(li);
            });
        } else {
            pulseValue.innerText = 'No data available';
        }
    }

    // Send a GET request to your ESP32 device to fetch the latest pulse data
    async function fetchPulseData() {
        try {
            const response = await fetch('http://your-esp32-device-ip/pulse');
            const data = await response.json();
            pulseData = data;
            updatePulseDisplay();
        } catch (error) {
            console.error('Error fetching pulse data:', error);
        }
    }

    // Fetch pulse data on page load and on button click
    fetchPulseData();

    refreshButton.addEventListener('click', fetchPulseData);
});
