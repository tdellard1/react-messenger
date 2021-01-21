import React, {createContext, useContext, useEffect, useState} from "react";
import {useAuthorization} from "./AuthorizationProvider";
import useConversationModalState from "../pages/messenger/state/NewConversationState";
import {useSocket} from "./SocketProvider";
import {useSelectedConversation} from "./conversation-states/selected-conversation";
import {getOneConversation} from "../pages/messenger/services/getOneConversation";

const ConversationContext = createContext({});

export function useConversations() {
    return useContext(ConversationContext);
}

export function ConversationProvider({children}) {
    const {socket} = useSocket();
    const {authentication} = useAuthorization();

    const [sendMessage, setSendMessage] = useState("");
    const [allConversations, setAllConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useSelectedConversation();
    const [conversationModal, setConversationModal] = useConversationModalState();

    // Adds message to the conversation through the server and then updates conversation when successful.
    useEffect(() => {
        if (sendMessage === "") return;

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
                socket.emit('send-message', res.conversation);
                setSelectedConversation(res.conversation);
            });
    }, [sendMessage, socket])

    // Add Socket Listener For Updated Conversations
    useEffect(() => {
        if (socket.connected) {
            socket.on('update-conversation', (conversation) => {
                setSelectedConversation(conversation);
            });

            socket.on('update-conversations', () => {
                fetchAllConversations();
            });
            return () => {};
        }
    }, [socket])

    // Join Socket Rooms When All Conversations Are Retrieved
    useEffect(() => {
        if (!socket.connected) return;
        socket.emit('join-rooms', allConversations.map(conversation => conversation._id));
    }, [allConversations, socket]);

    useEffect(() => {
        fetchAllConversations();
    }, []);

    function fetchAllConversations() {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${authentication.token}`
            }
        }

        fetch(`conversations/${authentication.id}`, requestOptions)
            .then(r => r.json())
            .then(async ({conversations}) => {
                if (conversations.length > 0) {
                    const {_id} = conversations.reverse()[0];
                    const conversation = await getOneConversation(_id, authentication);
                    setSelectedConversation(conversation);
                    setAllConversations(conversations.reverse());
                }
            });
    }

    function closeModal() {
        setConversationModal(false);
    }

    function openModal() {
        setConversationModal(true);
    }

    const providerValue = {
        sendMessage, setSendMessage,
        conversations: allConversations,
        setConversations: setAllConversations,
        conversationModal, setConversationModal,
        selectedConversation, setSelectedConversation,
        fetchAllConversations,
        openModal, closeModal
    }

    return (
        <ConversationContext.Provider value={providerValue}>
            {children}
        </ConversationContext.Provider>
    );
}
