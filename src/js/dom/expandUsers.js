export default function expand() {
    const $toggle = document.getElementById('expand_more')
    const $players = document.querySelector('.players_wrapper')

    $toggle.addEventListener('click', function() {
        if (this.innerText === 'expand_more') {
            $players.classList.add('active')
            this.innerText = 'expand_less'
        } else {
            $players.classList.remove('active')
            this.innerText = 'expand_more'
        }
    })
}