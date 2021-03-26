import React, {useEffect, useState} from 'react';
import {Redirect, Route, RouteProps, useHistory} from 'react-router-dom';


const PrivateRoute = ({children, ...rest}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const apiToken = window.localStorage.getItem('api_token')
        console.log(apiToken)
        if(apiToken) {
            setIsLoggedIn(true)
        } else {
            history.push('/login')
        }
    })

    return (
        <Route
            {...rest}
            render={({location}) => {
                return isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to=
                            '/staff/login'
                        
                    />
                );
            }}
        />
    );
};

export default PrivateRoute;