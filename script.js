const API_KEY = 'YOUR-OPENROUTER-API-KEY'; // Replace this!

const chat = document.getElementById('chat');
const messageBox = document.getElementById('messageBox');
const sendBtn = document.getElementById('sendBtn');

async function sendMessage() {
    const message = messageBox.value;
    if (!message) return;

    // Show user message
    chat.innerHTML += `<div class="user">You: ${message}</div>`;
    messageBox.value = '';

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-2',
                messages: [{
                    role: 'user',
                    content: message
                }]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        // Show bot reply
        chat.innerHTML += `<div class="bot">Bot: ${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        chat.innerHTML += `<div class="bot">Error: ${error.message}</div>`;
    }
}

sendBtn.onclick = sendMessage;
messageBox.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
};
