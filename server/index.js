import http from 'http';
import express from 'express';
import socket from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection', socket => {
  // set default username
  socket.username = 'anonymous';

  socket.on('sign_in', ({username}) => {
    if (username) {
      socket.username = username;
      socket.emit('sign_in_success', {username});
    }
  });

  socket.on('send_message', ({message}) => {
    const {username} = socket;

    io.sockets.emit('new_message', {sender: username, message})
  });

  socket.on('typing', () => {
    const {username} = socket;

    socket.broadcast.emit('typing', {username});
  });
});

server.listen(3000, () => {
  console.log('Running at http://localhost:3000')
});
