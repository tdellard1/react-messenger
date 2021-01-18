import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {useAuthorization} from "./AuthorizationProvider";
import useConversationModalState from "../pages/messenger/state/NewConversationState";
const ConversationContext = createContext({});

export function useConversations() {
    return useContext(ConversationContext);
}

export function ConversationProvider({children}) {
    const {authentication} = useAuthorization();

    const isFirstRun = useRef(true);
    const [sendMessage, setSendMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState({});
    const [conversationModal, setConversationModal] = useConversationModalState();

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${authentication.token}`
            },
            body: JSON.stringify({
                content: sendMessage
            })
        }

        fetch(`conversations/${selectedConversation._id}`, requestOptions)
            .then(r => r.json())
            .then(res => {
                console.log('res: ', res);
                // setSelectedConversation(res.conversation);
            });
    }, [sendMessage])

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${authentication.token}`
            }
        }

        fetch(`conversations/${authentication.id}`, requestOptions)
            .then(r => r.json())
            .then(res => {
                setConversations(res.conversations);
            });
    }, []);

    function closeModal() {
        setConversationModal(false);
    }

    function openModal() {
        setConversationModal(true);
    }

    const providerValue = {
        sendMessage, setSendMessage,
        conversations, setConversations,
        conversationModal, setConversationModal,
        selectedConversation, setSelectedConversation,
        openModal, closeModal}

    return (
        <ConversationContext.Provider value={providerValue}>
            {children}
        </ConversationContext.Provider>
    );
}
