import io from 'socket.io-client'

let socket = io.connect('http://localhost:9000');

socket.on('add-new-user', data => {
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user) {
        return;
    }

    const $amountUsers = document.getElementById('amount_users');    
    $amountUsers.innerText = data.amount;
    
    const $players = document.querySelector('.players');
    const $li = document.createElement('li');        
    const addUsername = () => {
        const $username = document.createElement('span');
        $username.classList.add('username');
        if (socket.id === data.userId) {
            $username.classList.add('bold');
        }
        $username.dataset.id = data.userId;
        $username.innerText = data.username;
        $li.appendChild($username);
    }
    
    const addInvite = () => {
        const $invite = document.createElement('span');
        $invite.innerText = 'invite';
        $invite.classList.add('invite');
        $li.appendChild($invite);
    }

    addUsername();
    if (socket.id !== data.userId) {
        addInvite();
    }

    $players.appendChild($li);

    return;
})

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

export default socket;