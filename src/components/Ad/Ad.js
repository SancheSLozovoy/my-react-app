// Ad.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ad.css';

function Ad({ ad, onDelete, user }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user) {
            setUserName(user.Name);
        } else if (ad.userId) {
            axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/users/${ad.userId}`)
                .then(response => {
                    const userData = response.data;
                    setUserName(userData.Name);
                })
                .catch(error => {
                    console.error('Ошибка при получении информации о пользователе:', error);
                });
        }
    }, [ad.userId, user]);

    const handleDelete = () => {
        axios.delete(`https://fe4f5b2b7285d6c0.mokky.dev/advertisements/${ad.id}`)
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
            {userName && <p className='Ad-user'>Создано пользователем: {userName}</p>}
            <button className='Ad-button__delete' onClick={handleDelete}>Удалить</button>
        </div>
    );
}

export default Ad;
