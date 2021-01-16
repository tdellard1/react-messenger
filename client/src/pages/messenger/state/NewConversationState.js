import {useEffect, useState} from "react";
import {useAuthorization} from "../../../contexts/AuthorizationProvider";

export default function useConversationModalState() {
    const [conversationModal, setConversationModal] = useState(false);
    const {authentication, setAllUsers} = useAuthorization();

    useEffect(() => {
        if (conversationModal === true) {
            const requestOptions = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${authentication.token}`
                }
            }

            fetch('users', requestOptions)
                .then(r => r.json())
                .then(response => {
                    setAllUsers(response.users.filter(resUser => resUser._id !== authentication.id));
                });
        }
    }, [conversationModal])

    return [conversationModal, setConversationModal];
}
