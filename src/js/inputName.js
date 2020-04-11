const inputName = (callback) => {
    const overlay = document.querySelector('.overlay')
    const input = document.querySelector('input')
    
    overlay.classList.add('active')
    setTimeout(() => {
        input.focus()
    }, 500)
    input.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            if (input.value.length >= 2) {
                overlay.classList.remove('active')
                callback(input.value, document.querySelector('.players li:last-child span.username').dataset.id)
            } else {
                input.classList.add('error')
            }
        }
    })
}

export default inputName
