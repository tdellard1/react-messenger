export function getOneConversation(conversationId, {token}) {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    }

    return fetch(`conversations/${conversationId}/messages`, requestOptions)
        .then(r => r.json())
        .then(res => (res.conversation));
}
