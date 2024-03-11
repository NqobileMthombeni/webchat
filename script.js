// Function to send a message
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();
    if (message !== '') {
        // Send message to backend server
        fetch('/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Add message to chat messages
                var messageElement = document.createElement('div');
                messageElement.innerText = message;
                var chatMessages = document.getElementById('chat-messages');
                chatMessages.appendChild(messageElement);
            } else {
                console.error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });

        // Clear message input
        messageInput.value = '';
    }
}

// Function to load previous messages from backend server
function loadMessages() {
    fetch('/getMessages')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var messages = data.messages;
            var chatMessages = document.getElementById('chat-messages');
            messages.forEach(function(message) {
                var messageElement = document.createElement('div');
                messageElement.innerText = message;
                chatMessages.appendChild(messageElement);
            });
        } else {
            console.error('Failed to load messages');
        }
    })
    .catch(error => {
        console.error('Error loading messages:', error);
    });
}

// Load previous messages when the page loads
window.onload = loadMessages;
