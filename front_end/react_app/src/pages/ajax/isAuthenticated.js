import React,{useState,useEffect} from 'react';
import {checkAuthentication} from "./ajax";


const getCookie = () => {
    let item = localStorage.getItem('auth_key');
    return (item == null ? false : item)
}

export const useAuthentication = () => {
    const [isLoggedIn,setIsLoggedIn] = useState('');

    useEffect(() => {
        if(!getCookie()) {
            setIsLoggedIn(false);
            return () => {}
        }
        async function fetchUser(){
            const isAuthenticated = await checkAuthentication(getCookie());
            setIsLoggedIn(isAuthenticated.data[0]);
        }
        fetchUser();
    },[])

    return isLoggedIn;
}
