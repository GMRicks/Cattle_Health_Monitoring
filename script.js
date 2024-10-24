document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('chat-btn');
    const chatModal = document.getElementById('chat-modal');
    const closeBtn = document.querySelector('.close');
    const sendBtn = document.getElementById('send-msg');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Open chat modal
    chatBtn.addEventListener('click', () => {
        chatModal.style.display = 'block';
    });

    // Close chat modal
    closeBtn.addEventListener('click', () => {
        chatModal.style.display = 'none';
    });

    // Close modal if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            chatModal.style.display = 'none';
        }
    });

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                addMessage('ai', aiResponse);
            }, 1000);
        }
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse(message) {
        // This is a simple simulation. In a real application, you would integrate with an AI service.
        const responses = [
            "Thank you for your question. A veterinarian will review it shortly.",
            "That's an interesting observation about your cattle. Let me consult our database.",
            "I understand your concern. Here's some general advice, but please consult with a vet for specific issues.",
            "Based on the symptoms you've described, it could be several things. I'd recommend a thorough check-up.",
            "Have you noticed any changes in your cattle's eating habits or behavior recently?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Simulated temperature data
    let temperatureData = [38.5, 38.7, 38.3, 38.6, 38.9];

    function updateTemperatureDisplay() {
        const temperatureValue = document.getElementById('temperature-value');
        const temperatureList = document.getElementById('temperature-list');
        
        if (temperatureValue && temperatureList) {
            const latestTemperature = temperatureData[temperatureData.length - 1];
            temperatureValue.innerText = `${latestTemperature.toFixed(1)} °C`;
            
            temperatureList.innerHTML = '';
            temperatureData.slice().reverse().forEach(temp => {
                const listItem = document.createElement('li');
                listItem.innerText = `${temp.toFixed(1)} °C`;
                temperatureList.appendChild(listItem);
            });
        }
    }

    // Refresh button functionality
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            const newTemperature = parseFloat((Math.random() * (39.5 - 38.0) + 38.0).toFixed(1));
            temperatureData.push(newTemperature);
            if (temperatureData.length > 10) temperatureData.shift();
            updateTemperatureDisplay();
        });
    }

    // Initial temperature display
    updateTemperatureDisplay();

    // New chat functionality code
    const apiKey = 'd0a9870b02f4a1a381a5a5a5a5a5a'; // Replace with your API key
    const chatDisplay = document.getElementById('chatDisplay');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', async () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            // Send the user's message to the API
            const response = await fetch(`https://api.wootric.com/v1/conversations?api_key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const conversationId = await response.json();

            // Display the user's message
            chatDisplay.innerHTML += `<p class="user-message">${userMessage}</p>`;

            // Get the veterinarian's response
            const veterinarianResponse = await fetch(`https://api.wootric.com/v1/conversations/${conversationId}/messages?api_key=${apiKey}`);
            const veterinarianMessage = await veterinarianResponse.json();

            // Display the veterinarian's response
            chatDisplay.innerHTML += `<p class="vet-message">${veterinarianMessage}</p>`;

            userInput.value = ''; // Clear the input field
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all "About Cattle" links
    const aboutLinks = document.querySelectorAll('.about-cattle-link');

    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            // Check if we're already on the home page
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                // If on home page, just scroll to the about section
                scrollToAbout();
            } else {
                // If not on home page, navigate to home page first, then scroll
                window.location.href = 'index.html#about';
            }
        });
    });

    // Function to handle smooth scrolling
    function scrollToAbout() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            setTimeout(() => {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500); // Delay scrolling by 500ms to ensure page is loaded
        }
    }

    // Check if we've just landed on the page with a hash in the URL
    if (window.location.hash === '#about') {
        scrollToAbout();
    }
});

document.getElementById("sendButton").addEventListener("click", async function() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() !== "") {
        const chatDisplay = document.getElementById("chatDisplay");
        
        // Display user's message
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user");
        userMessage.textContent = userInput;
        chatDisplay.appendChild(userMessage);
        
        // Clear input field
        document.getElementById("userInput").value = "";

        // Call the API to get a reply
        try {
            const response = await fetch('d0a9870b02f4a1a3819b1db11e8ee26730234c72', {
                method: 'POST', // or 'GET' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other required headers here
                },
                body: JSON.stringify({ message: user Message.textContent }) // Adjust payload as needed
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const vetMessage = document.createElement("div");
            vetMessage.classList.add("message", "vet");
            vetMessage.textContent = data.reply; // Adjust according to your API response structure
            chatDisplay.appendChild(vetMessage);
        } catch (error) {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("message", "vet");
            errorMessage.textContent = "Sorry, I couldn't get a response. Please try again.";
            chatDisplay.appendChild(errorMessage);
        }
    }
});

// Optional: Handling the modal send button if needed
document.getElementById("send-msg").addEventListener("click", async function() {
    const chatInput = document.getElementById("chat-input").value;
    if (chatInput.trim() !== "") {
        const chatMessages = document.getElementById("chat-messages");
        
        // Display user's message
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user");
        userMessage.textContent = chatInput;
        chatMessages.appendChild(userMessage);
        
        // Clear input field
        document.getElementById("chat-input").value = "";

        // Call the API to get a reply
        try {
            const response = await fetch('d0a9870b02f4a1a3819b1db11e8ee26730234c72', {
                method: 'POST', // or 'GET' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other required headers here
                },
                body: JSON.stringify({ message: userMessage.textContent }) // Adjust payload as needed
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const vetMessage = document.createElement("div");
            vetMessage.classList.add("message", "vet");
            vetMessage.textContent = data.reply; // Adjust according to your API response structure
            chatMessages.appendChild(vetMessage);
        } catch (error) {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("message", "vet");
            errorMessage.textContent = "Sorry, I couldn't get a response. Please try again.";
            chatMessages.appendChild(errorMessage);
        }
    }
});

let currentIndex = 0;
const boxes = document.querySelectorAll('.health-monitoring-box');
const totalBoxes = boxes.length;

function updateBoxes() {
    boxes.forEach((box, index) => {
        box.classList.remove('active');
        box.style.transform = 'translateX(0)'; // Reset position
        box.style.opacity = '0.5'; // Reset opacity
    });

    // Calculate the new index
    const activeIndex = currentIndex % totalBoxes;
    boxes[activeIndex].classList.add('active');
    boxes[activeIndex].style.opacity = '1'; // Full opacity

    // Move boxes
    boxes.forEach((box, index) => {
        const offset = (index - activeIndex) * 160; // Adjust for spacing
        box.style.transform = `translateX(${offset}px)`;
    });
}

// Move to the next box automatically every 3 seconds
setInterval(() => {
    currentIndex++;
    updateBoxes();
}, 3000);

// Navigation buttons
document.getElementById('next').addEventListener('click', () => {
    currentIndex++;
    updateBoxes();
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalBoxes - 1; // Loop back to the last box
    }
    updateBoxes();
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex++;
        updateBoxes();
    } else if (event.key === 'ArrowLeft') {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalBoxes - 1; // Loop back to the last box
        }
        updateBoxes();
    }
});

// Initial update
updateBoxes();
