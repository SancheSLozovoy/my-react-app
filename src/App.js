import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import Entrance from './pages/Entrance/Entrance'; 
import Register from './pages/Register/Register';
import Favorites from './pages/Favorites/Favorites';

function App() {
    const history = useHistory();

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'currentUser') {
                const newUser = JSON.parse(event.newValue);
                if (!isValidUser(newUser)) {
                    localStorage.removeItem('currentUser');
                    history.push('/');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [history]);

    const isValidUser = (user) => {
        return user && user.Name === 'alexloz' && user.Password === 'alexloz' && user.id === 1;
    };


    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Entrance} />
                    <Route path="/register" component={Register}/>
                    <Route path="/main" component={Main} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/favorites" component={Favorites}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
