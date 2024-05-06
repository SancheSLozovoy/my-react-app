import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Register.css';

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = () => {
        if (login.trim() === '' || password.trim() === '') {
            alert('Заполните все поля!');
        } else {
            history.push('/main');
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
