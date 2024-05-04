import './Profile.css';
import Header from '../../components/Header/Header';

function Profile() {
    return (
        <div className="Profile">
            <Header/>
          <header className="Profile-header">
            <h1 className="Profile-title">Пользователи</h1>
            <p className='Profile-p'>"Имя пользователя"</p>
            <input placeholder='Поиск...' className='Profile-input'></input>
          </header>
        </div>
      );
}

export default Profile;
