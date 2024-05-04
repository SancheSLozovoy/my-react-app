import React, { useState } from 'react';
import './Main.css';
import Ad from '../../components/Ad/Ad';
import Popup from '../../components/Popup/Popup';
import Header from '../../components/Header/Header';

function Main() {
    const [ads, setAds] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [nextId, setNextId] = useState(1); // Уникальный идентификатор для новых объявлений

    const handleAddAd = (newAd) => {
        newAd.id = nextId; // Присваиваем уникальный идентификатор
        setAds([...ads, newAd]);
        setNextId(nextId + 1); // Увеличиваем счетчик для следующего идентификатора
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
                {showPopup && <Popup onAddAd={handleAddAd} />}
                <div className="grid-container">
                    {ads.map((ad) => (
                        <Ad key={ad.id} ad={ad} onDelete={handleDeleteAd} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;
