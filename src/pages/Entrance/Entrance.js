// Entrance.js
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './Entrance.css';

function Entrance() {
    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (login.trim() === '' || password.trim() === '') {
            alert('Заполните все поля!');
        } else {
            setLoading(true);
            axios.get('https://fe4f5b2b7285d6c0.mokky.dev/users')
                .then(response => {
                    const users = response.data;
                    const user = users.find(u => u.Name === login && u.Password === password);
                    setLoading(false);
                    if (user) {
                        // Сохраняем пользователя в локальное хранилище
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        // Перенаправляем на страницу 'main'
                        history.push('/main');
                    } else {
                        alert('Ошибка при входе. Пожалуйста, проверьте свои учетные данные и попробуйте снова.');
                    }
                })
                .catch(error => {
                    console.error('Ошибка при входе:', error);
                    alert('Ошибка при входе. Пожалуйста, проверьте свои учетные данные и попробуйте снова.');
                    setLoading(false);
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
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : 'Войти'}
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
