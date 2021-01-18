import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useAuthorization} from "../../../../contexts/AuthorizationProvider";
import {useConversations} from "../../../../contexts/ConversationProvider";

const useStyles = makeStyles({
    fullWidth: {
        width: "100%",
    },
    fontHeavy: {
        fontWeight: 600
    },
})

export default function NameBar() {
    const classes = useStyles();
    const {authentication} = useAuthorization();
    const {selectedConversation} = useConversations();

    const  getReceiver = () => {
        const {participants} = selectedConversation;
        const receiver = participants && participants.find(participant => participant._id !== authentication.id).username;
        return receiver || "No Participants";
    }

    return (
        <Box className={classes.fullWidth} boxShadow={1} p={1}>
            <Toolbar className={classes.fontHeavy}>
                {getReceiver()}
            </Toolbar>
        </Box>
    );
};
