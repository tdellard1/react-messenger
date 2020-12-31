import {useEffect, useState} from 'react';

export default function useLocalAuth() {
    const authenticationStatus = JSON.parse(localStorage.getItem('user'));
    const [authentication, setAuthentication] = useState(authenticationStatus);

    useEffect(() => {
        if (authentication) {
            localStorage.setItem('user', JSON.stringify(authentication));
        } else {
            localStorage.removeItem('user');
        }
    }, [authentication]);

    return [authentication, setAuthentication];
}
