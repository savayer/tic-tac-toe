import init from "__js/init";
import socket from "__js/socket";
import input from "__js/inputName";
import expand from "__js/dom/expandUsers";

document.addEventListener('DOMContentLoaded', () => {
    const editUsername = data => {
        socket.emit('edit-username', {
            username: data.username,
            userId: data.userId
        })
    }
    const promise = input(editUsername);

    if (promise) {
        promise.then(editUsername)
    }
    init();
    expand();
})