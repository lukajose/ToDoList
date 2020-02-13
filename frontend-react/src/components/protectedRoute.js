import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../AuthContext';

function ProtectedRout(props) {
    const token = React.useContext(AuthContext);
    console.log('token');
    // if token doesnt exist then do not allowed access and redirect to login
    if(!token) {
        return <Redirect to="/login"/>;
    }
        return <Route {...props}/>;
}

export default ProtectedRout;