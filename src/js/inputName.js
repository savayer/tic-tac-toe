import ws from "./ws";

const inputName = (callback) => {
    const overlay = document.querySelector('.overlay')
    const input = document.querySelector('input')
    if (sessionStorage.getItem('username')) {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (ws.readyState === 1 && document.querySelector('.players li:last-child span.username')) {
                    const username = sessionStorage.getItem('username');
                    const userId = document.querySelector('.players li:last-child span.username').dataset.id;
                    resolve({ userId, username });
                    clearInterval(interval)
                }
            }, 10)
        })
    }
    overlay.classList.add('active')
    setTimeout(() => {
        input.focus()        
    }, 500)
    input.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            if (input.value.length >= 2) {
                const userId = document.querySelector('.players li:last-child span.username').dataset.id;
                sessionStorage.setItem('username', input.value)
                overlay.classList.remove('active')
                callback({
                    username: input.value,
                    userId
                })
            } else {
                input.classList.add('error')
            }
        }
    })
}

export default inputName
