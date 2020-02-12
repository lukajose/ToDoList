import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import RegisterPage from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import AuthProvider from './AuthContext';


function App () {
    const [authDetails,setAuthDetails] = React.useState(
        localStorage.getItem('token')
    );

    function setAuth(token,u_id) {
        localStorage.setItem('token',token);
        localStorage.setItem('u_id',u_id);
        setAuthDetails(token);
    }

    return (
        <AuthProvider value={authDetails}>
            <Router>
                <Switch>
                    <Route
                    exact
                    path="/login"
                    render={(props)=>{
                        return <Login {...props} setAuth={setAuth}/>;
                    }}
                    />
                    <Route
                    exact
                    path="/register"
                    render={(props)=>{
                        return <RegisterPage {...props} setAuth={setAuth}/>;
                    }}
                    />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;


