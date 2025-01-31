import axios from "axios"

const chatContainer = document.getElementById("chat-container")
const userInput = document.getElementById("user-input")
const sendButton = document.getElementById("send-button")

const messages = []

sendButton.addEventListener("click", sendMessage)
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage()
  }
})

function sendMessage() {
  const message = userInput.value.trim()
  if (message) {
    addMessageToChat("You", message)
    userInput.value = ""
    fetchBotResponse(message)
  }
}

function addMessageToChat(sender, message) {
  const messageElement = document.createElement("p")
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`
  chatContainer.appendChild(messageElement)
  chatContainer.scrollTop = chatContainer.scrollHeight
}

async function fetchBotResponse(message) {
  try {
    const response = await axios.post("/api/chat", {
      messages: [...messages, { role: "user", content: message }],
    })
    const botMessage = response.data.choices[0].message.content
    addMessageToChat("Bot", botMessage)
    messages.push({ role: "user", content: message })
    messages.push({ role: "assistant", content: botMessage })
  } catch (error) {
    console.error("Error:", error)
    addMessageToChat("Bot", "Sorry, I encountered an error. Please try again.")
  }
}

