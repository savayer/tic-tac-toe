import io from 'socket.io-client'

let socket = io.connect('http://localhost:9000');

socket.emit('create-new-user')

socket.on('add-new-user', data => {
    const $amountUsers = document.getElementById('amount_users');    
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user) return;

    $amountUsers.innerText = data.amount;
    const $players = document.querySelector('.players');
    const $li = document.createElement('li');
    const $username = document.createElement('span');
    const $invite = document.createElement('span');

    $invite.innerText = 'invite';
    $invite.classList.add('invite');
    $username.classList.add('username');
    $username.dataset.id = data.userId;
    $username.innerText = data.username;
    $li.appendChild($username);
    $li.appendChild($invite);

    $players.appendChild($li);

    return;
})

socket.on('edit-username', data => {
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user) {
        $user.innerText = data.username
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

export default socket;