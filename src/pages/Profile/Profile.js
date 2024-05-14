import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './Profile.css';
import Header from '../../components/Header/Header';

function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        setCurrentUser(JSON.parse(storedUser));
    }, []);
    
    useEffect(() => {
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

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <div className="Profile">
            <Header />
            <header className="Profile-header">
                <h1 className="Profile-title">Пользователи</h1>
                <div className='Profile-user-block'>
                    {currentUser && <p className='Profile-current-user'>Авторизованный пользователь: {currentUser.Name}</p>}
                    {!currentUser && <p className='Profile-current-user'>Пользователь не авторизован</p>}
                </div>
                <div className='Profile-search-box'>
                    {currentUser && (
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
                    )}
                    {!currentUser && (
                        <div>
                            <p className='Profile-no-user'>Чтобы увидеть список пользователей, авторизуйтесь</p>
                            <Link className='Profile-link' to="/">Авторизуйтесь</Link>
                        </div>
                    )}
                    {currentUser && (
                        <button className="Profile-logout-button" onClick={handleLogout}>Выйти</button>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Profile;
