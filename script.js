// script.js

window.onload = function () {
  // Fetch messages from the server and display them
  fetchMessages();
};

function fetchMessages() {
  fetch('/messages')
    .then(response => response.json())
    .then(messages => {
      const messagesDiv = document.getElementById('messages');
      messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message.text;
        messagesDiv.appendChild(messageElement);
      });
    })
    .catch(error => console.error('Error fetching messages:', error));
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const text = messageInput.value;

  // Send message to the server
  fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then(response => {
      if (response.ok) {
        messageInput.value = ''; // Clear input field after sending message
        fetchMessages(); // Fetch updated messages from the server
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    })
    .catch(error => console.error('Error sending message:', error));
}
