import io from 'socket.io-client';
import { tableObject } from './init';
import message from './dom/message';
import addNewUser from './dom/add-new-user';

const socket = io.connect(process.env.SITE_URL);

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
    const invite = `${currentUsername} invites you to the game. Let's go?`   
    
    message.showInvite(invite, () => {
        socket.emit('game-prepare', data)
    }, () => {
        socket.emit('user-declined-invite', {
            invitedUserId: data.invitedUserId,
            currentUserId: data.currentUserId,
            invitedUsername
        })
    })
})

socket.on('info', data => {
    if (data.type === 'decline-invite') {
        message.stopWaitingTimer()
        alert(data.message)
    } else {
        alert(data)
    }
    //message.setMessage(data)
})

socket.on('console-info', data => {
    console.log(data)
})

socket.on('game-start', data => {
    alert(data.message)
    message.stopWaitingTimer()
    
    if (data.your_turn) {
        message.setMessage('Your turn')
        sessionStorage.setItem('userData', JSON.stringify({
            type: 'x',
            userId: data.currentUserId,
            opponentUserId: data.invitedUserId,
            roomName: data.roomName
        }))
        tableObject.activateTable()
    } else {
        message.setMessage('Opponent\'s turn')
        sessionStorage.setItem('userData', JSON.stringify({
            type: 'o',
            userId: data.invitedUserId,
            opponentUserId: data.currentUserId,
            roomName: data.roomName
        }))
    }
})

export default socket;