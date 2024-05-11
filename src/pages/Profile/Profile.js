import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from '../../components/Header/Header';

function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favoriteAds, setFavoriteAds] = useState([]);

    useEffect(() => {
        // Загрузка данных о текущем пользователе из локального хранилища
        const storedUser = localStorage.getItem('currentUser');
        setCurrentUser(JSON.parse(storedUser));
        // Загрузка всех пользователей
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('https://fe4f5b2b7285d6c0.mokky.dev/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке всех пользователей:', error);
            }
        };
        fetchAllUsers();
    }, []);

    useEffect(() => {
        // Загрузка избранных объявлений текущего пользователя
        const fetchFavoriteAds = async () => {
            try {
                const response = await axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/favorites?userId=${currentUser.id}`);
                const favoriteAdsData = [];
                for (const favorite of response.data) {
                    const adResponse = await axios.get(`https://fe4f5b2b7285d6c0.mokky.dev/advertisements/${favorite.adId}`);
                    favoriteAdsData.push({
                        id: favorite.id,
                        ad: adResponse.data
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

    const filteredUsers = users.filter(user =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeFromFavorites = async (favoriteId) => {
        try {
            await axios.delete(`https://fe4f5b2b7285d6c0.mokky.dev/favorites/${favoriteId}`);
            setFavoriteAds(prevFavorites => prevFavorites.filter(favorite => favorite.id !== favoriteId));
        } catch (error) {
            console.error('Ошибка при удалении объявления из избранного:', error);
        }
    };

    return (
        <div className="Profile">
            <Header />
            <header className="Profile-header">
                <h1 className="Profile-title">Пользователи</h1>
                <div className='Profile-user-block'>
                    {currentUser && <p className='Profile-current-user'>Авторизованный пользователь: {currentUser.Name}</p>}
                </div>
                <div className='Profile-search-box'>
                    <ul className="Profile-user-list">
                        <h3 className='Profile-title__h3'>Список пользователей</h3>
                        <input
                        type="text"
                        placeholder="Поиск..."
                        className='Profile-input'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                        {filteredUsers.map(user => (
                            <li key={user.id} className="Profile-user">{user.Name}</li>
                        ))}
                    </ul>
                    
                </div>
                <div className="Profile-favorites">
                    <h3 className='Profile-title__h3'>Избранные объявления</h3>
                    <div className='Profile-ads'>
                        {favoriteAds.map(favorite => (
                            <div key={favorite.id} className="Profile-favorite-ad">
                                <h4 className='Ad-title'>{favorite.ad.title}</h4>
                                <p className='Ad-price'>Цена: ${favorite.ad.price}</p>
                                <button className='Ad-button__delete' onClick={() => removeFromFavorites(favorite.id)}>Удалить из избранного</button>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Profile;
