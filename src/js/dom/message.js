const message = {
    setMessage(content) {
        document.querySelector('#message').innerHTML = content
    },
    clearMessage() {
        document.querySelector('#message').innerHTML = ''
    },
    showInvite(inviteMessage, acceptCb, declineCb) {
        const inviteWrapper = document.querySelector('.getting-invite');        
        const accept = document.getElementById('accept_invite')
        const decline = document.getElementById('decline_invite')

        inviteWrapper.querySelector('.getting-invite__content').innerHTML = inviteMessage
        inviteWrapper.classList.add('active')

        accept.addEventListener('click', () => {
            inviteWrapper.classList.remove('active')
            acceptCb()
        })
        decline.addEventListener('click', () => {
            inviteWrapper.classList.remove('active')
            declineCb()
        })
    }
}

export default message;