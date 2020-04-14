const invite = (s) => {
    document.querySelectorAll('.invite').forEach(item => {
        const currentUser = document.querySelector('.username.bold')
        const currentUserId = currentUser.dataset.id
        const currentUsername = currentUser.innerText
    
        item.addEventListener('click', function() {
            const userId = this.previousElementSibling.dataset.id
            s.emit('invite-user', {
                userId,
                currentUserId,
                currentUsername
            })
        })
    })
}

export default invite;