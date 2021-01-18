import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NameBar from "./open-conversation/NameBar";
import Messages from "./open-conversation/Messages";
import SendMessage from "./open-conversation/SendMessage";

const useStyles = makeStyles({
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    fullWidth: {
        width: "100%"
    },
    fullHeight: {
        height: "100%"
    },
})

export default function OpenConversation() {
    const classes = useStyles();

    return (
        <div className={`${classes.flexColumn} ${classes.fullWidth}`}>
            <NameBar />
            <Messages />
            <SendMessage />
        </div>
    );
}
