import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './Entrance.css';

function Entrance() {
    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (login.trim() === '' || password.trim() === '') {
            alert('Заполните все поля!');
        } else {
            // Отправляем запрос на сервер для авторизации пользователя
            axios.post('/login', { login, password })
                .then(response => {
                    console.log(response.data);
                    history.push('/main');
                })
                .catch(error => {
                    console.error('Ошибка при входе:', error);
                    alert('Ошибка при входе. Пожалуйста, проверьте свои учетные данные и попробуйте снова.');
                });
        }
    };

    return (
        <div className="Entrance">
            <header className="Entrance-header">
                <h1 className="Entrance-title">Вход</h1>
                <form className='Entrance-header__form'>
                    <input 
                        className='Entrance-header__input' 
                        placeholder='Логин' 
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required 
                    />
                    <input 
                        className='Entrance-header__input' 
                        placeholder='Пароль' 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required 
                    />
                    <button 
                        type='button' 
                        className='Entrance-header__button'
                        onClick={handleLogin}
                    >
                        Войти
                    </button>
                    <Link to="/register" className='Entrance-header__reg'>
                        <p>Зарегистрироваться</p>
                    </Link>
                </form>
            </header>
        </div>
    );
}

export default Entrance;
