const socket = io();
const chatForm = document.getElementById('chat-form')

// meta from server
socket.on('message', (message) => {
    console.log(message)
    outputMessage(message)
})

chatForm.addEventListener('submit', (event) => {
    event.preventDefault()

    var message = {}
    message.text = event.target.elements.msg.value
    message.from = 'user'
    socket.emit('chatMessage', message)
    event.target.elements.msg.value = ''

})

// output message to DOM

function outputMessage(message) {
    let div_message = document.createElement('div')
    div_message.setAttribute('class', 'message')

    let div_meta = document.createElement('div')
    div_meta.setAttribute('class', 'meta')
    div_meta.innerText = message.from + ' ' + message.createdAt

    let div_text = document.createElement('div')
    div_text.setAttribute('class', 'text')
    div_text.innerText = message.text

    div_message.appendChild(div_meta)
    div_message.appendChild(div_text)

    document.querySelector('.chat-messages').appendChild(div_message)
}