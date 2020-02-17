import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import {AuthProvider} from './AuthContext';
import ProtectedRoute from './components/protectedRoute';
import DashBoard from './pages/DashBoard';


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
                        return <LoginPage {...props} setAuth={setAuth}/>;
                    }}
                    />
                    <Route
                    exact
                    path="/register"
                    render={(props)=>{
                        return <RegisterPage {...props} setAuth={setAuth}/>;
                    }}
                    />
                    <ProtectedRoute exact path="/" component={DashBoard}/>
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;


