import invite from './invite';

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

const addInvite = node => {
    return new Promise(resolve => {
        const $invite = document.createElement('span');
        $invite.innerText = 'invite';
        $invite.classList.add('invite');
        node.appendChild($invite);
        resolve();
    })
}

const addNewUser = (data, socket) => {
    const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
    if ($user) {
        return;
    }

    const $amountUsers = document.getElementById('amount_users');
    $amountUsers.innerText = data.amount;

    const $players = document.querySelector('.players');
    const $li = document.createElement('li');

    addUsername($li, data, socket);
    if (socket.id !== data.userId) {
        addInvite($li).then(() => invite(socket))
    }

    $players.appendChild($li);

    return;
}

export default addNewUser;