fetch('https://example.com/api/cattle-data')
  .then(response => response.json())
  .then(data => {
    const cattleName = document.getElementById('cattle-name');
    const cattleType = document.getElementById('cattle-type');
    const currentTemp = document.getElementById('current-temp');
    const currentHeartRate = document.getElementById('current-heart-rate');
    const currentRespiratoryRate = document.getElementById('current-respiratory-rate');
    const currentFeedIntake = document.getElementById('current-feed-intake');
    const currentWaterConsumption = document.getElementById('current-water-consumption');

    cattleName.textContent = data.name;
    cattleType.textContent = data.type;
    currentTemp.textContent = data.temperature;
    currentHeartRate.textContent = data.heartRate;
    currentRespiratoryRate.textContent = data.respiratoryRate;
    currentFeedIntake.textContent = data.feedIntake;
    currentWaterConsumption.textContent = data.waterConsumption;
  })
  .catch(error => console.error(error));

  const imageUploader = document.getElementById('image-uploader');
const uploadButton = document.getElementById('upload-button');
const uploadedImage = document.getElementById('uploaded-image');

uploadButton.addEventListener('click', () => {
    imageUploader.click();
});

imageUploader.addEventListener('change', () => {
    const file = imageUploader.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        uploadedImage.src = reader.result;
    };
    reader.readAsDataURL(file);
});