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
        let newSocket;

        if (authentication && authentication.token) {
            newSocket = io(`http://localhost:3001`,
                { auth: {token: authentication.token}
                });
        } else {
            newSocket = io('http://localhost:3001');
        }

        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
}
