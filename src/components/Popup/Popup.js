import React, { useState } from 'react';
import './Popup.css';

function Popup({ onAddAd }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const handleAddAd = () => {
        if (title && price) {
            const newAd = {
                title: title,
                price: parseFloat(price),
                userId: 1 // Предполагается, что здесь вы установите ID пользователя
            };
            onAddAd(newAd);
            setTitle('');
            setPrice('');
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
