const addUsername = (node, data, socket) => {
    const $username = document.createElement('span');
    $username.classList.add('username');
    if (socket.id === data.userId) {
        $username.classList.add('bold');
    }
    $username.dataset.id = data.userId;
    $username.innerText = data.username;
    node.appendChild($username);
}

const addInvite = (node, s) => {
    const $timer = document.createElement('div');
    const $invite = document.createElement('div');        
    const $inviteText = document.createElement('span');

    $inviteText.innerText = 'invite'
    $invite.appendChild($inviteText)
    $invite.classList.add('invite')

    $timer.classList.add('timer')
    $invite.appendChild($timer)

    let inviteInProcess = false;
    $invite.addEventListener('click', function() {
        if (inviteInProcess) return;
        const currentUserId = document.querySelector('.username.bold').dataset.id
        const invitedUserId = this.previousElementSibling.dataset.id
        const currentUsername = document.querySelector('.username.bold').innerHTML
        
        $inviteText.innerText = 'waiting'
        $timer.classList.add('start')
        inviteInProcess = true
        $timer.addEventListener('animationend', function() {
            this.classList.remove('start')
            inviteInProcess = false
            $inviteText.innerText = 'invite'
        })
        s.emit('invite-user', {
            invitedUserId,
            currentUserId,
            currentUsername
        })
    })
    node.appendChild($invite);
}

const addNewUser = (data, socket) => {
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user && $user.innerText === sessionStorage.getItem('username')) {
        return;
    }

    const $amountUsers = document.getElementById('amount_users');
    $amountUsers.innerText = data.amount;

    const $players = document.querySelector('.players');
    const $li = document.createElement('li');

    addUsername($li, data, socket);
    if (socket.id !== data.userId) {
        addInvite($li, socket);
    }

    $players.appendChild($li);

    return;
}

export default addNewUser;