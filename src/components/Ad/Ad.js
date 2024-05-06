// Ad.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ad.css';

function Ad({ ad, onDelete }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (ad.userId) {
            axios.get(`/user/${ad.userId}`)
                .then(response => {
                    const userData = response.data;
                    console.log(userData);
                    setUserName(userData.Name);
                })
                .catch(error => {
                    console.error('Ошибка при получении информации о пользователе:', error);
                });
        }
    }, [ad.userId]);

    const handleDelete = () => {
        axios.delete(`/advertisements/${ad.id}`)
            .then(response => {
                console.log('Объявление успешно удалено');
                onDelete(ad.id);
            })
            .catch(error => {
                console.error('Ошибка при удалении объявления:', error);
            });
    };

    return (
        <div className="Ad">
            <h3 className='Ad-title'>{ad.title}</h3>
            <p className='Ad-price'>Цена: ${ad.price}</p>
            {userName && <p className='Ad-user'>Пользователь: {userName}</p>}
            <button className='Ad-button__delete' onClick={handleDelete}>Удалить</button>
        </div>
    );
}

export default Ad;
