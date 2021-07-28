const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);


const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

app.get('/meet',(req,res)=>{
  res.render('video/makeRoom')
})
app.post('/makeRoom',(req,res)=>{
  res.redirect('/video')
})

app.get("/video", (req, rsp) => {
  rsp.redirect(`/video/${uuidv4()}`);                   //id ko catch kar with video route
});

app.get("/video/:room", (req, res) => {
  res.render("video/room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

module.exports = app
