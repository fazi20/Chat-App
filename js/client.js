const socket = io('http://localhost:3000')

const form = document.getElementById('send-container')
const messageinp = document.getElementById('messageinp')
const messagecontainer = document.querySelector('.container')
var audio = new Audio('messenger.mp3')
const append = (message, position) => {

    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messagecontainer.append(messageElement)
    if (position == 'left') {

        audio.play();
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinp.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageinp.value = ''
})

const user = prompt("Enter Your Name");
socket.emit('new-user-joined', user)


socket.on('user-joined', user => {
    append(`${user} joined the chat`, 'right')

})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')

})
socket.on('left', user => {
    append(`${user} left the chat`, 'left')

})