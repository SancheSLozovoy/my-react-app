import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ad.css';

function Ad({ ad, onDelete, currentUser, removeFromFavorites }) {
    const [userName, setUserName] = useState('');
    const [isCurrentUserAd, setIsCurrentUserAd] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        if (ad.userId) {
            axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/users/${ad.userId}`)
                .then(response => {
                    const userData = response.data;
                    setUserName(userData.Name);
                    setIsCurrentUserAd(currentUser && ad.userId === currentUser.id);
                })
                .catch(error => {
                    console.error('Ошибка при получении информации о пользователе:', error);
                });
        }
    }, [ad.userId, currentUser]);

    useEffect(() => {
        if (currentUser) {
            axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/favorites?userId=${currentUser.id}&adId=${ad.id}`)
                .then(response => {
                    const favorite = response.data[0];
                    setIsFavorite(favorite !== undefined);
                    setFavoriteId(favorite ? favorite.id : null);
                })
                .catch(error => {
                    console.error('Ошибка при проверке избранного:', error);
                });
        }
    }, [currentUser, ad.id]);

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

    const handleAddToFavorites = () => {
        axios.post(`https://fe4f5b2b7285d6c0.mokky.dev/favorites`, {
            adId: ad.id,
            userId: currentUser.id
        })
        .then(response => {
            console.log('Объявление успешно добавлено в избранное');
            setIsFavorite(true);
            setFavoriteId(response.data.id);
        })
        .catch(error => {
            console.error('Ошибка при добавлении объявления в избранное:', error);
        });
    };

    const handleRemoveFromFavorites = () => {
        axios.delete(`https://fe4f5b2b7285d6c0.mokky.dev/favorites/${favoriteId}`)
            .then(response => {
                console.log('Объявление успешно удалено из избранного');
                setIsFavorite(false);
                setFavoriteId(null);
                removeFromFavorites(favoriteId);
            })
            .catch(error => {
                console.error('Ошибка при удалении объявления из избранного:', error);
            });
    };

    return (
        <div className="Ad">
            <h3 className='Ad-title'>{ad.title}</h3>
            <p className='Ad-price'>Цена: ${ad.price}</p>
            {userName && <p className='Ad-user'>Создано пользователем: {userName}</p>}
            {isCurrentUserAd && <button className='Ad-button__delete' onClick={handleDelete}>Удалить</button>}
            {currentUser && !isCurrentUserAd && (
                <>
                    {!isFavorite ? (
                        <button className='Ad-button__favorite' onClick={handleAddToFavorites}>Добавить в избранное</button>
                    ) : (
                        <button className='Ad-button__favorite' onClick={handleRemoveFromFavorites}>Удалить из избранного</button>
                    )}
                </>
            )}
        </div>
    );
}

export default Ad;
