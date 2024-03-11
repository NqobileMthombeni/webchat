function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();

    if (message !== "") {
        var chatWindow = document.getElementById("chat-window");
        var newMessage = document.createElement("div");
        newMessage.textContent = message;
        chatWindow.appendChild(newMessage);

        // Scroll to bottom of chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Clear message input
        messageInput.value = "";
    }
}
