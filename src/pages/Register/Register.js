import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = () => {
        if (login.trim() === '' || password.trim() === '') {
            alert('Заполните все поля!');
        } else {
            // Проверка наличия пользователя с таким логином
            axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/users?Name=${login}`)
                .then(response => {
                    if (response.data.length > 0) {
                        alert('Пользователь с таким логином уже существует. Пожалуйста, выберите другой логин.');
                    } else {
                        // Регистрация нового пользователя
                        axios.post('https://fe4f5b2b7285d6c0.mokky.dev/users', { Name: login, Password: password })
                            .then(response => {
                                console.log(response.data);
                                // Сохраняем пользователя в локальное хранилище
                                localStorage.setItem('currentUser', JSON.stringify(response.data));
                                alert('Регистрация успешна!');
                                history.push('/main');
                            })
                            .catch(error => {
                                console.error('Ошибка при регистрации:', error);
                                alert('Ошибка при регистрации. Пожалуйста, попробуйте снова.');
                            });
                    }
                })
                .catch(error => {
                    console.error('Ошибка при проверке логина:', error);
                    alert('Ошибка при проверке логина. Пожалуйста, попробуйте снова.');
                });
        }
    };
    return (
        <div className="Register">
            <header className="Register-header">
                <h1 className="Register-title">Регистрация</h1>
                <form className='Register-header__form'>
                    <input 
                        className='Register-header__input' 
                        placeholder='Логин'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)} 
                        required 
                    />
                    <input 
                        className='Register-header__input' 
                        placeholder='Пароль' 
                        type='password' 
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type='button' 
                        className='Register-header__button'
                        onClick={handleRegister}
                    >
                        Зарегистрироваться
                    </button>
                    <Link className='Register-header__enter' to={'/'}>
                        <p>Уже зарегистрированы? Войдите</p>
                    </Link>
                </form>
            </header>
        </div>
    );
}

export default Register;
