socket = io.connect("http://localhost:3000", {
    withCredentials: true,
});

const messages = document.querySelector(".messages");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const nameBlock = document.querySelector(".name");
const userName = prompt("ваше имя:");
nameBlock.innerHTML = `${userName}`;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", { message: input.value, name: userName });
        input.value = "";
    }
});
socket.on("chat message", (data) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${data.name}</span>:  ${data.message}`;
    messages.appendChild(item);
});
