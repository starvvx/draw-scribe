const sockets = io('https://illus-traitor.herokuapp.com')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
sockets.emit('new-user', name)

sockets.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

sockets.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

sockets.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  sockets.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}