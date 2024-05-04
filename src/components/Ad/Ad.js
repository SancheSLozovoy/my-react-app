import React from 'react';
import './Ad.css';

function Ad({ ad, onDelete }) {
    const handleDelete = () => {
        onDelete(ad.id);
    };

    return (
        <div className="Ad">
            <h3 className='Ad-title'>{ad.title}</h3>
            <p className='Ad-price'>Цена: ${ad.price}</p>
            <p className='Ad-user'>Пользователь: {ad.userId}</p>
            <button className='Ad-botton__delete' onClick={handleDelete}>Удалить</button>
        </div>
    );
}

export default Ad;
