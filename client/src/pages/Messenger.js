import React, {useEffect, useState} from "react";

import {Button, InputAdornment, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        height: "100vh"
    },
    userOptions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    conversations: {
        display: "flex",
        flexDirection: "column",
        width: "31.33%",
        height: "100%",
        margin: "0 2%",

        '& .MuiInputBase-root': {
            color: "#ADC0DE",
            backgroundColor: "#E9EEF9"
        }
    },
    conversationListItem: {
      border: "1px solid black",

        "&:hover": {
          backgroundColor: "aqua"
        }
    },
    conversation: {
        width: "66.66%",
        backgroundColor: "coral"
    },
    chatInput: {
        backgroundColor: "white"
    }
});

function Messenger({user, setAuthentication}) {
    const history = useHistory();
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState({});

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.token}`
            }
        }

        fetch(`conversations/${user.id}`, requestOptions)
            .then(r => r.json())
            .then(res => {
                setConversations(res.conversations);
            });
    }, []);

    function getConversation(conversionId) {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.token}`
            }
        }

        fetch(`messages/${conversionId}`, requestOptions)
            .then(r => r.json())
            .then(res => {
                setSelectedConversation(res.conversation);
                console.log(res.conversation);
            });
    }

    function ConversationListItem({conversation}) {
        const handleClick = () => {
            getConversation(conversation._id)
        }

        return (
            <div className={classes.conversationListItem} onClick={handleClick}>
                <span>{conversation.participants.map(participant => (
                    <span key={participant._id}>{participant.username}, </span>
                ))}</span>
                <br />
                <span>{conversation.messages.content}</span>
            </div>
        )
    }

    function AllConversations() {
        return (
            <div className={classes.conversations}>
                <div className={classes.userOptions}>
                    <span>{user.username}</span>
                    <Button variant="contained"
                            onClick={logOut}
                            color="primary">Log Out</Button>
                </div>
                <h3>Chats</h3>
                <TextField placeholder="Search"
                           variant="outlined"
                           fullWidth={true}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               )
                           }}/>
                {conversations.map(conversation => (
                    <ConversationListItem key={conversation._id}
                                          conversation={conversation}/>
                ))}
            </div>);
    }

    function sendMessage() {
        console.log(selectedConversation);

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                content: message
            })
        }

        fetch(`conversations/${selectedConversation._id}`, requestOptions)
            .then(r => r.json())
            .then(res => {
                // setSelectedConversation(res.conversation);
                console.log(res);
            });
    }

    function logOut() {
        localStorage.removeItem('user');
        setAuthentication(false);
        history.push("/login");
    }

    return (
        <div className={classes.root}>
            <AllConversations/>
            <div className={classes.conversation}>
                <div>
                    <span>
                        {selectedConversation.participants ?
                            selectedConversation.participants.map(value => (value.username + ", "))
                            : "No Participants"}
                    </span>
                </div>

                <div>
                    {selectedConversation.messages ?
                        selectedConversation.messages.map(message => (
                            <div>
                                <b>{message.sender.username}</b>:&nbsp;
                                <span>{message.content}</span>
                            </div>
                        )) :
                        "No Messages"}
                </div>
                <TextField placeholder="Type something..."
                           variant="outlined"
                           fullWidth={true}
                           className={classes.chatInput}
                           onChange={(e) => setMessage(e.target.value)}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               )
                           }}/>
                <Button variant="contained"
                        onClick={sendMessage}
                        color="primary">Send</Button>

            </div>
        </div>
    );
}

export default Messenger;
