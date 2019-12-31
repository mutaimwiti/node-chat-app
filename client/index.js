$(document).ready(() => {
  const socket = io.connect('http://localhost:3000');

  // sections
  const logoutSection = $('#logout_section');
  const loginSection = $('#login_section');
  const chatSection = $('#chat_section');

  // inputs
  const username = $('#username');
  const message = $('#message');

  // captions and displays
  const chat = $('#chat');
  const user = $('#user');

  // buttons
  const sendMessageBtn = $('#send_message');
  const signOutBtn = $('#sign_out');
  const signInBtn = $('#sign_in');

  // hide sections requiring sign in
  logoutSection.hide();
  chatSection.hide();

  const signIn = (username) => {
    socket.emit('sign_in', {username});
  };

  const currentUser = localStorage.getItem('username');

  if (currentUser) {
    signIn(currentUser);
  }

  socket.on('sign_in_success', ({username}) => {
    localStorage.setItem('username', username);
    user.html(`<b>${username}</b>`);
    logoutSection.show();
    loginSection.hide();
    chatSection.show();
  });

  socket.on('new_message', ({sender, message}) => {
    chat.append(`<p><b>${sender}</b> : ${message}</p>`);
  });

  signInBtn.click(event => {
    event.preventDefault();

    signIn(username.val());

    username.val('');
  });

  sendMessageBtn.click(event => {
    event.preventDefault();

    const msg = message.val().trim();

    if (msg) {
      socket.emit('send_message', {message: msg});

      message.val('');
    }

    message.focus();
  });

  signOutBtn.click(event => {
    event.preventDefault();
    localStorage.removeItem('username');
    chatSection.hide();
    loginSection.show();
    logoutSection.hide();
    user.html(null);
  });
});
