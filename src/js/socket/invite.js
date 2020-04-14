const invite = (s) => {
    document.querySelectorAll('.invite').forEach(item => {
        const currentUserId = document.querySelector('.username.bold').dataset.id

        item.addEventListener('click', function() {
            const invitedUserId = this.previousElementSibling.dataset.id
            console.log('invite-user')
            s.emit('invite-user', {
                invitedUserId,
                currentUserId
            })
        })
    })
}

export default invite;