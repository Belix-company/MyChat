const azizSelectorBtn = document.querySelector('#aziz-selector')
const boburSelectorBtn = document.querySelector('#bobur-selector')
const toshmatSelectorBtn = document.querySelector('#toshmat-selector')
const eshmatSelectorBtn = document.querySelector('#eshmat-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div >
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`



let messageSender = 'Aziz'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Aziz') {
    azizSelectorBtn.classList.add('active-person')
  }
  else if (name === 'Bobur') {
    boburSelectorBtn.classList.add('active-person')
  } 
  else if (name === 'Toshmat') {
    toshmatSelectorBtn.classList.add('active-person')
  }
  else if (name === 'Eshmat') {
    eshmatSelectorBtn.classList.add('active-person')
  }

  chatInput.focus()
}

azizSelectorBtn.onclick = () => updateMessageSender('Aziz')
boburSelectorBtn.onclick = () => updateMessageSender('Bobur')
toshmatSelectorBtn.onclick = () => updateMessageSender('Toshmat')
eshmatSelectorBtn.onclick = () => updateMessageSender('Eshmat')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  chatMessages.innerHTML += createChatMessageElement(message)

  
  chatInputForm.reset()


  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})