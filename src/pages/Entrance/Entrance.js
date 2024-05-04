// Entrance.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Entrance.css';

function Entrance() {
    const history = useHistory();

    const handleLogin = () => {
        // Здесь может быть логика для входа
        // После успешного входа осуществляем переход на страницу Main
        history.push('/main'); // Переход на страницу Main
    };

    return (
        <div className="Entrance">
            <header className="Entrance-header">
                <h1 className="Entrance-title">Вход</h1>
                <form className='Entrance-header__form'>
                    <input 
                        className='Entrance-header__input' 
                        placeholder='Логин' 
                        required 
                    />
                    <input 
                        className='Entrance-header__input' 
                        placeholder='Пароль' 
                        type='password' 
                        minLength={6}
                        required 
                    />
                    <button 
                        type='button' 
                        className='Entrance-header__button'
                        onClick={handleLogin} // Вызываем функцию handleLogin при нажатии на кнопку
                    >
                        Войти
                    </button>
                </form>
            </header>
        </div>
    );
}

export default Entrance;
