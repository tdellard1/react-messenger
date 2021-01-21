import React, {createContext, useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useAuthorization} from "./AuthorizationProvider";

const SocketContext = createContext({});

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}) {
    const {authentication} = useAuthorization();
    const [socket, setSocket] = useState({});

    useEffect(() => {
        if (!authentication) {
            if (socket.connected) socket.close(); return;
        }

        const newSocket = io('http://localhost:3001', {
            auth: {token: authentication.token}
        });

        newSocket.on('connect', () => {
            console.log('Socket IO connected from client.');
            setSocket(newSocket);
        });
        // eslint-disable-next-line
    }, [authentication]);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
}
