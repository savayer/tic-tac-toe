import init from "_scripts/init";
import ws from "_scripts/ws";
import input from "_scripts/inputName";
/* const $start = document.getElementById("start");

$start.addEventListener("click", () => {
    
}); */

document.addEventListener('DOMContentLoaded', () => {
    input((username, userId) => {        
        ws.send(JSON.stringify(
            {
                type: 'edit-username',
                userId,
                username
            }
        ));
    });
    init();
})