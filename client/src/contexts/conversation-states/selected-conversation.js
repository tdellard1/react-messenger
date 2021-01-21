import {useEffect, useState} from "react";

export function useSelectedConversation() {
    const localSelectedConversation = JSON.parse(localStorage.getItem('selectedConversation'));
    const [selectedConversation, setSelectedConversation] = useState(localSelectedConversation || {});

    useEffect(() => {
        if (selectedConversation) {
            localStorage.setItem('selectedConversation', JSON.stringify(selectedConversation));
        } else {
            localStorage.removeItem('selectedConversation');
        }
    }, [selectedConversation]);

    return [selectedConversation, setSelectedConversation];
}
