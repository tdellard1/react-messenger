import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Conversations from "./components/Conversations";
import OpenConversation from "./components/OpenConversation";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        height: "100vh"
    }
});

function Messenger() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Conversations classes={classes} />
            <OpenConversation />
        </div>
    );
}

export default Messenger;
