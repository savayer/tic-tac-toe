let ws;
if (location.protocol === 'https:') {
    ws = new WebSocket('wss://tictactoe.savayer.me:9000');
} else {
    ws = new WebSocket('ws://localhost:9000');
}

const parseMessage = stringifiedData => {
    const data = JSON.parse(stringifiedData);
    const $amountUsers = document.getElementById('amount_users');    

    if (data.type === 'user') {
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
    }

    if (data.type === 'edit-username') {
        const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
        if ($user) {
            $user.innerText = data.username
        }
    }

    if (data.type === 'remove-user') {
        const $user = document.querySelector(`span.username[data-id="${data.userId}"]`)
        if ($user) {
            $user.closest('li').remove()
        }
    }
}

//ws.onopen = () => alert('Online');

ws.onclose = event => {
    if (event.wasClean) {
        console.log('offline')
    } else {
        console.log('disconnected', event)
    }
}

ws.onmessage = event => {
    parseMessage(event.data)
};

ws.onerror = error => {        
    console.log(error);
};

export default ws;