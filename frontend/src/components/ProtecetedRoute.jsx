
import React, { useEffect } from 'react';
import { useAuth } from '../AuthContex';
import { useNavigate } from 'react-router-dom';

const ProtecetedRoute = ({children}) => {


    const {user, setUser} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {


        if(!user){
            navigate("/login")
        }

    },[user]);

    return (
        <>
            {children}
        </>
    );
 
}

export default ProtecetedRoute;
