import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ad from '../../components/Ad/Ad';
import Popup from '../../components/Popup/Popup';
import './Main.css';
import Header from '../../components/Header/Header';

function Main() {
    const [ads, setAds] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await axios.get('https://fe4f5b2b7285d6c0.mokky.dev/advertisements');
                setAds(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке объявлений:', error);
            }
        };
        fetchAdvertisements();

        const storedUser = localStorage.getItem('currentUser');
        setCurrentUser(JSON.parse(storedUser));

    }, []);

    const handleAddAd = (newAd) => {
        setAds([...ads, newAd]);
        setShowPopup(false);
    };

    const handleDeleteAd = (id) => {
        setAds(ads.filter(ad => ad.id !== id));
    };

    return (
        <div className="Main">
            <Header />
            <div className='content'>
                <button className="Main-button" onClick={() => setShowPopup(true)}>Добавить объявление</button>
                {showPopup && <Popup onAddAd={handleAddAd} currentUser={currentUser} />} 
                <div className="grid-container">
                    {ads.map((ad) => (
                        <Ad key={ad.id} ad={ad} onDelete={handleDeleteAd} currentUser={currentUser} /> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;
