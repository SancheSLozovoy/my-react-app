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

    const filteredUsers = users.filter(user =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="Profile">
            <Header />
            <header className="Profile-header">
                <h1 className="Profile-title">Пользователи</h1>
                {currentUser && <p className='Profile-current-user'>Авторизованный пользователь: {currentUser.Name}</p>}
                <input
                    type="text"
                    placeholder="Поиск..."
                    className='Profile-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="Profile-user-list">
                    <h3 className='Profile-title__h3'>Список пользователей</h3>
                    {filteredUsers.map(user => (
                        <li key={user.id} className="Profile-user">{user.Name}</li>
                    ))}
                </ul>
                <div className="Profile-favorites">
                    <h3 className='Profile-title__h3'>Избранные объявления</h3>
                    {favoriteAds.map(ad => (
                        <div key={ad.id} className="Profile-favorite-ad">
                            <h4>{ad.title}</h4>
                            <p>Цена: ${ad.price}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default Profile;