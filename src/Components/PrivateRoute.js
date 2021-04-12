import React, {useEffect, useState} from 'react';
import {Redirect, Route, useHistory} from 'react-router-dom';
import EditContact from "./Pages/EditContact";



const PrivateRoute = ({children, ...rest}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const apiToken = window.localStorage.getItem('api_token')
        if(apiToken) {
            setIsLoggedIn(true)
        } else {
            history.push('/Login')
        }

    },[history, isLoggedIn])
  //  console.log(rest)

    return (
        <Route
            {...rest}
            render={() => { 
                return isLoggedIn ? (
                      children
                ) : (
                    <Redirect
                        to='/Login'
                    />
                )
            }}
        />
    );
};

export default PrivateRoute;