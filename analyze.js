import { loadModel } from './model.js';

let model;

// Load the model when the page is loaded
window.onload = async () => {
    model = await loadModel();
};

document.getElementById('analyze-button').addEventListener('click', async () => {
    const imageInput = document.getElementById('image-input');
    const healthParams = {
        temperature: parseFloat(document.getElementById('temperature').value),
        pulse: parseFloat(document.getElementById('pulse').value),
        respiration: parseFloat(document.getElementById('respiration').value),
        feedIntake: parseFloat(document.getElementById('feed-intake').value),
        waterConsumption: parseFloat(document.getElementById('water-consumption').value),
        hrv: parseFloat(document.getElementById('hrv').value),
    };

    if (imageInput.files.length > 0) {
        const image = imageInput.files[0];
        const imageData = await imageToTensor(image);
        const result = await model.predict(imageData, healthParams); // Call the model's predict function
        displayResult(result);
    } else {
        alert('Please select an image');
    }
});

async function imageToTensor(image) {
    const imageTensor = tf.tensor3d(new Uint8Array(await image.arrayBuffer()), [image.height, image.width, 3]);
    return imageTensor;
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Health Status: ${result.healthStatus}</h3>
        <p>Disease Probability: ${result.diseaseProbability * 100}%</p>
        <p>Treatment: ${result.treatment}</p>
    `;
}