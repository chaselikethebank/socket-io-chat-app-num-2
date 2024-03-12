// Assuming you have included Socket.io in your HTML file

// Connect to the Socket.io server
const socket = io();

// DOM elements
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messagesContainer = document.querySelector('#messages-container');

// Listen for messages from the server
socket.on('message', (message) => {
    displayMessage(message);
});

// Handle form submission and send messages to the server
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    
    if (messageText !== '') {
        // Emit the message to the server
        socket.emit('sendMessage', messageText);

        // Clear the input field
        messageInput.value = '';
    }
});

// Display a new message on the UI
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
}
