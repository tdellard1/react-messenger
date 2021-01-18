import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useConversations} from "../../../../contexts/ConversationProvider";

export default function SendMessage() {
    const [message, setMessage] = useState("");
    const {setSendMessage} = useConversations();

    const classes = makeStyles({
        flexRow: {
            display: "flex",
            flexDirection: "row"
        },
        text: {
            width: "100%"
        }
    })();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setSendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className={classes.flexRow}>
            <TextField value={message}
                       placeholder="Type something..."
                       variant="outlined"
                       className={classes.text}
                       onKeyPress={handleKeyPress}
                       onChange={(e) => setMessage(e.target.value)}
                />
        </div>
    );
}
