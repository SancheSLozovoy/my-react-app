import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favorites.css';
import Header from '../../components/Header/Header';

function Favorites() {
    const [currentUser, setCurrentUser] = useState('');
    const [favoriteAds, setFavoriteAds] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        setCurrentUser(JSON.parse(storedUser));
    }, [])

    useEffect(() => {
        const fetchFavoriteAds = async () => {
            try {
                const response = await axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/favorites?userId=${currentUser.id}`);
                const favoriteAdsData = [];
                for (const favorite of response.data) {
                    const adResponse = await axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/advertisements/${favorite.adId}`);
                    const userResponse = await axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/users/${adResponse.data.userId}`);
                    favoriteAdsData.push({
                        id: favorite.id,
                        ad: adResponse.data,
                        user: userResponse.data
                    });
                }
                setFavoriteAds(favoriteAdsData);
            } catch (error) {
                console.error('Ошибка при загрузке избранных объявлений:', error);
            }
        };
        if (currentUser) {
            fetchFavoriteAds();
        }
    }, [currentUser]);
    

    const removeFromFavorites = async (favoriteId) => {
        try {
            await axios.delete(`https://fe4f5b2b7285d6c0.mokky.dev/favorites/${favoriteId}`);
            setFavoriteAds(prevFavorites => prevFavorites.filter(favorite => favorite.id !== favoriteId));
        } catch (error) {
            console.error('Ошибка при удалении объявления из избранного:', error);
        }
    };

    return (
        <div className="Favorites">
            <Header />
            <header className="Favorites-header">
                <div className="Favorites-favorites">
                    <h3 className='Favorites-title__h3'>Избранные объявления</h3>
                    <div className='Favorites-ads'>
                        {favoriteAds.map(favorite => (
                            <div key={favorite.id} className="Favorites-favorite-ad">
                                <h4 className='Ad-title'>{favorite.ad.title}</h4>
                                <p className='Ad-price'>Цена: ${favorite.ad.price}</p>
                                <p className='Ad-user'>Создано пользователем: {favorite.user.Name}</p>
                                <button className='Ad-button__delete' onClick={() => removeFromFavorites(favorite.id)}>Удалить из избранного</button>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Favorites;
