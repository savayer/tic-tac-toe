const message = {
    setMessage(content) {
        document.querySelector('#message').innerHTML = content
    },
    clearMessage() {
        document.querySelector('#message').innerHTML = ''
    },
    showInvite(inviteMessage, acceptCb, declineCb) {
        const template = document.getElementById('notify')
        const notifyBlock = template.content.cloneNode(true)
        const inviteWrapper = document.querySelector('.getting-invite');

        const accept = notifyBlock.querySelector('.getting-invite__accept')
        const decline = notifyBlock.querySelector('.getting-invite__decline')

        const container = notifyBlock.querySelector('.getting-invite__container')
        container.classList.add('active')
        
        notifyBlock.querySelector('.getting-invite__content').innerHTML = inviteMessage
        inviteWrapper.appendChild(notifyBlock)

        setTimeout(() => {
            if (container.classList.contains('active')) {
                container.remove()
            }
        }, 10000);

        accept.addEventListener('click', () => {
            setTimeout(() => {
                container.remove()
            }, 100)
            acceptCb()
        })
        decline.addEventListener('click', () => {
            setTimeout(() => {
                container.remove()
            }, 100)
            declineCb()
        })
    },
    stopWaitingTimer() {
        document.querySelectorAll('.timer').forEach(timer => {
            timer.classList.remove('start')
            if (timer.previousElementSibling.nodeName === 'SPAN') {
                timer.previousElementSibling.innerHTML = 'invite'
            }
        })
    }
}

export default message;