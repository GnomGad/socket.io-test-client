socket = io.connect("http://localhost:3000", {
    withCredentials: true,
});

const messages = document.querySelector(".messages");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const nameBlock = document.querySelector(".name");
const userName = "123"; // prompt("ваше имя:");
nameBlock.innerHTML = `${userName}`;

function writeMessage(data) {
    const item = document.createElement("li");
    const date = new Date();
    item.innerHTML = `<span>[${date.toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
    })}]</span> <span><b>${data.name}</b></span>: ${data.message}`;
    messages.appendChild(item);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("client-to-server-message", {
            id: socket.id,
            message: input.value,
            name: userName,
        });
        writeMessage({ name: userName, message: input.value });
        input.value = "";
    }
});
socket.on("connect", () => {
    console.log(socket.id);
});
socket.on("disconnect", () => {
    console.log("disconnect"); // undefined
});
socket.emit("hello", "world");
socket.on("server-to-client-message", (data) => {
    writeMessage(data);
});
