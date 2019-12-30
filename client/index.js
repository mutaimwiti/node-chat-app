$(document).ready(() => {
  const username = $('#username');
  const message = $('#message');
  const chat = $('#chat');

  const socket = io.connect('http://localhost:3000');

  socket.on('new_message', ({sender, message}) => {
    chat.append(`<p>${sender} said: ${message}</p>`)
  });

  $('#sign_in').click(event => {
    event.preventDefault();

    socket.emit('sign_in', {username: username.val()});

    username.val('');
  });

  $('#send_message').click(event => {
    event.preventDefault();

    socket.emit('send_message', {message: message.val()})
  });


});
