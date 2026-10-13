var registerForm = document.getElementById('register-form');

console.log('site.js загружен, форма найдена:', registerForm);

if (registerForm) {

    registerForm.addEventListener('submit', function (event) {

        console.log('submit сработал');

        event.preventDefault();

        var formData = new FormData(registerForm);
        var nickname = formData.get('nickname');
        var email = formData.get('email');
        var password = formData.get('password');

        console.log('nickname:', nickname);
        console.log('email:', email);
        console.log('password:', password);

        if (!nickname || nickname.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Введите никнейм'
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Пароль должен быть не короче 8 символов'
            });
            return;
        }

        localStorage.setItem('nickname', nickname);

        Swal.fire({
            icon: 'success',
            title: 'Готово!',
            text: 'Регистрация прошла успешно, ' + nickname + '!'
        }).then(function () {
            window.location.href = 'main.html';
        });

        registerForm.reset();
    });

}


var chatForm = document.getElementById('chat-form');
var messagesFeed = document.getElementById('messages-feed');
var currentUserLabel = document.getElementById('current-user');

var currentUser = localStorage.getItem('nickname') || 'гость';

if (currentUserLabel) {
    currentUserLabel.textContent = currentUser;
}

if (chatForm) {

    chatForm.addEventListener('submit', function (event) {

        event.preventDefault();

        var formData = new FormData(chatForm);
        var message = formData.get('message');

        console.log('новое сообщение:', message);

        if (!message || message.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Сообщение не может быть пустым'
            });
            return;
        }

        var messageBlock = document.createElement('div');
        messageBlock.className = 'border-bottom py-2 d-flex justify-content-between';
        messageBlock.innerHTML =
            '<span></span><small class="text-muted">от: ' + currentUser + '</small>';
        messageBlock.querySelector('span').textContent = message;

        messagesFeed.appendChild(messageBlock);

        chatForm.reset();
    });

}