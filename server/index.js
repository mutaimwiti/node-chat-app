import http from 'http';
import express from 'express';
import socket from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection', socket => {
  console.log('new user connected');

  // set default username
  socket.username = 'anonymous';

  socket.on('sign_in', ({username}) => {
    if (username) {
      socket.username = username;
    }
  });

  socket.on('send_message', ({message}) => {
    const {username} = socket;

    io.sockets.emit('new_message', {sender: username, message})
  });
});

server.listen(3000, () => {
  console.log('Running at http://localhost:3000')
});
