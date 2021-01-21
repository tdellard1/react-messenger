import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {Button, TextField} from "@material-ui/core";

import React, {useState} from "react";
import {useAuthorization} from "../../../contexts/AuthorizationProvider";
import {useConversations} from "../../../contexts/ConversationProvider";

export default function NewConversationModal() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [firstMessage, setFirstMessage] = useState("");
    const {authentication, allUsers} = useAuthorization();
    const {conversationModal, setConversationModal, closeModal, setSelectedConversation, conversations, fetchAllConversations} = useConversations();

    const startNewConversation = () => {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${authentication.token}`
                },
                body: JSON.stringify({
                    recipientId: allUsers[selectedIndex]._id,
                    content: firstMessage
                })
            }

            fetch('conversations', requestOptions)
                .then(r => r.json())
                .then(response => {
                    setSelectedConversation(response.conversation);
                    fetchAllConversations();
                    closeModal();
                });
    }

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    }
    return (
        <Dialog open={conversationModal} onClose={() => {setConversationModal(false)}} fullWidth={ true } maxWidth={"xs"}>
            <DialogTitle>Start A New Conversation</DialogTitle>
            <DialogContent>
                <List>
                    {allUsers
                        .filter(user  => {
                            const participants2DArray = conversations.map((conversation) => (conversation.participants));
                            const currentParticipants = [].concat.apply([], participants2DArray);
                            return !currentParticipants.find(participant => participant._id === user._id);
                        })
                        .map((user, index) => (
                        <div key={index}>
                            <ListItem button
                                      selected={selectedIndex === index}
                                      onClick={() => handleListItemClick(index)}>
                                <ListItemText primary={user.username} />
                                <Divider />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <TextField required
                           fullWidth={true}
                           variant="outlined"
                           placeholder="Send a message..."
                           onChange={(e) => setFirstMessage(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={startNewConversation} color="primary">Start New Conversation</Button>
                <Button onClick={closeModal}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
