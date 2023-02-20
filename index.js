// const io = require("socket.io-client");

// const socket = io("httpL//localhost:3000");

const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/assets"));

http.listen(8080, () => {
    console.log("start");
});
