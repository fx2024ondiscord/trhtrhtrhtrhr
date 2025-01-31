const API_KEY = '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'; // Replace this!

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
