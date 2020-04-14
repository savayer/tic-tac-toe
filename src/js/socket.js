import io from 'socket.io-client';
import addNewUser from './socket/add-new-user';

const socket = io.connect('http://localhost:9000');

socket.on('add-new-user', data => addNewUser(data, socket))

socket.on('edit-username', data => {
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user) {
        $user.innerText = data.username;
    }
})

socket.on('remove-user', data => {
    const $amountUsers = document.getElementById('amount_users');    
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user) {
        $user.closest('li').remove()
        $amountUsers.innerText = data.amount
    }
})

socket.on('getting-invite', data => {
    const currentUsername = document.querySelector(`span.username[data-id="${data.currentUserId}"]`).innerText
    const invitedUsername = document.querySelector(`span.username[data-id="${data.invitedUserId}"]`).innerText
    const invite = `${currentUsername} invites you to game. Let's go?`    
    if (confirm(invite)) {
        socket.emit('start-game')
    } else {
        socket.emit('user-declined-invite', {
            invitedUserId: data.invitedUserId,
            currentUserId: data.currentUserId,
            invitedUsername
        })
    }
})

socket.on('info', data => {
    alert(data)
})

socket.on('game-step', data => {
    console.log(data)
    
})

export default socket;