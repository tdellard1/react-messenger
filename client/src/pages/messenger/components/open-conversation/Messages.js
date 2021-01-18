import React from "react";
import {useAuthorization} from "../../../../contexts/AuthorizationProvider";
import {useConversations} from "../../../../contexts/ConversationProvider";
import Message from "../Message";
import {makeStyles} from "@material-ui/core/styles";

export default function Messages() {
    const {authentication} = useAuthorization();
    const {selectedConversation} = useConversations();
    const classes = makeStyles({
        allMessages: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            flex: "1 1 auto",
            position: "relative"
        },
        overflow: {
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: 0, bottom: 0,
            left: 0, right: 0,
            overflow: "auto",
            padding: "1rem 2rem",
            marginTop: "0.05rem"

        }
    })();

    function displayMessages({sender, content, timeStamp, _id}) {
        const isCurrentUser = sender._id === authentication.id;
        const date = new Date(timeStamp);
        const time = `${date.getHours()}:${date.getMinutes()}`;


        return (
            <Message key={_id} content={content} isCurrentUser={isCurrentUser} sender={sender} time={time}/>
        );
    }

    if (Array.isArray(selectedConversation.messages)) {
        return (
            <div className={classes.allMessages}>
                <div className={classes.overflow}>
                    {selectedConversation.messages.map(displayMessages)}
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
};
