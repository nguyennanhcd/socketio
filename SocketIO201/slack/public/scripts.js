const username = prompt('Enter username')
const password = prompt('Enter password')

const socket = io('http://localhost:8001')
socket.on('connect', () => {
  console.log('Connected to the server!')
  socket.emit('clientConnect')
})

// listen for the nsList event from the server which gives us the namespaces
socket.on('nsList', (nsData) => {
  console.log(nsData)
  const nameSpacesDiv = document.querySelector('.namespaces')
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>`
  })
})
