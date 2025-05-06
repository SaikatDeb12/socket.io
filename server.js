const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected!"),
    // socket.on("chat message", (msg) => {
    //   console.log("Message: ", msg);
    //   //broadcast
    //   io.emit("chat message", msg);
    // });

    socket.join("group1");
  socket.emit("message", "you joined group 1");

  socket.on("chat message", (msg) => {
    console.log("Message: ", msg);
    io.to("group1").emit("group message", msg);
  });

  socket.on("disconnect", () => console.log("User disconnected!"));
});

server.listen(8000, () => console.log("server started at port: 8000"));
