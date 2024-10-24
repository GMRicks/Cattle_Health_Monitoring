document.getElementById('water-intake-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const waterAmount = parseFloat(document.getElementById('water-amount').value);
    const cattleType = document.getElementById('cattle-type').value;

    // Update Actual Water Intake
    document.getElementById('actual-water-intake-value').textContent = waterAmount + ' liters';

    // Calculate Ideal Water Intake based on cattle type
    const idealWaterIntake = calculateIdealWaterIntake(cattleType);
    document.getElementById('ideal-water-intake-value').textContent = idealWaterIntake + ' liters';

    // Update Water Intake Chart
    updateWaterIntakeChart(waterAmount, idealWaterIntake);
});

function calculateIdealWaterIntake(cattleType) {
    const intakeValues = {
        dairy: 30,
        beef: 40,
        calf: 15
    };
    return intakeValues[cattleType] || 0;
}

function updateWaterIntakeChart(actual, ideal) {
    const chartContainer = document.getElementById('water-intake-chart');
    chartContainer.innerHTML = ''; // Clear previous chart

    const actualBar = document.createElement('div');
    actualBar.className = 'chart-bar actual';
    actualBar.style.width = `${actual * 2}px`; // Scale for better visibility
    actualBar.innerText = `Actual: ${actual} L`;
    chartContainer.appendChild(actualBar);

    const idealBar = document.createElement('div');
    idealBar.className = 'chart-bar ideal';
    idealBar.style.width = `${ideal * 2}px`; // Scale for better visibility
    idealBar.innerText = `Ideal: ${ideal} L`;
    chartContainer.appendChild(idealBar);
}
