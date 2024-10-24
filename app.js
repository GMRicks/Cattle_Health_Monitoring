import { loadModel } from './model.js';

let model;

async function init() {
    model = await loadModel();
}

document.getElementById('assessButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Please upload an image!');
        return;
    }

    const file = fileInput.files[0];
    const imageTensor = await loadImageAsTensor(file); // Function to convert image to tensor

    const result = await model.predict(imageTensor);
    displayResults(result);
});

function loadImageAsTensor(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                // Convert image to tensor (using TensorFlow.js or similar)
                const tensor = tf.browser.fromPixels(img).resizeBilinear([224, 224]).expandDims(0).toFloat().div(255);
                resolve(tensor);
            };
        };
        reader.readAsDataURL(file);
    });
}

function displayResults(result) {
    document.getElementById('healthStatus').innerText = `Health Status: ${result.healthStatus}`;
    document.getElementById('diseaseProbability').innerText = `Disease Probability: ${result.diseaseProbability.toFixed(2)}`;
    document.getElementById('treatment').innerText = `Recommended Treatment: ${result.treatment}`;
    document.getElementById('results').style.display = 'block'; // Show results
}

// Initialize the model when the page loads
init();