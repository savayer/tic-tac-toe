import init from "_scripts/init";
import ws from "_scripts/ws";
import input from "_scripts/inputName";
/* const $start = document.getElementById("start");

$start.addEventListener("click", () => {
    
}); */

document.addEventListener('DOMContentLoaded', () => {
    const editUsername = (data) => {
        ws.send(JSON.stringify(
            {
                type: 'edit-username',
                username: data.username,
                userId: data.userId
            }
        ))
    }
    const promise = input(editUsername);

    if (promise) {
        promise.then(editUsername)
    }    
    init();
})