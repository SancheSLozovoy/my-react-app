// Popup.js

import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css';

function Popup({ onAddAd, currentUser }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const handleAddAd = () => {
        if (title && price) {
            const newAd = {
                title: title,
                price: parseFloat(price),
                userId: currentUser.id // Используем ID текущего пользователя
            };

            // Отправка POST запроса на сервер Mokky Dev для добавления объявления
            axios.post('https://fe4f5b2b7285d6c0.mokky.dev/advertisements', newAd)
                .then(response => {
                    console.log(response.data); // Выводим ответ сервера в консоль
                    onAddAd(response.data); // Добавляем объявление в список на фронтенде
                    setTitle('');
                    setPrice('');
                })
                .catch(error => {
                    console.error('Ошибка при добавлении объявления:', error);
                    alert('Ошибка при добавлении объявления. Пожалуйста, попробуйте снова.');
                });
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    return (
        <div className="Popup">
            <h2>Добавить объявление</h2>
            <input type="text" placeholder="Название" value={title} maxLength={45} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="Цена" value={price} maxLength={1} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAddAd}>Добавить</button>
        </div>
    );
}

export default Popup;
