import {Button, InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import ConversationListItem from "./ConversationListItem";
import {useConversations} from "../../../contexts/ConversationProvider";
import {useAuthorization} from "../../../contexts/AuthorizationProvider";
import NewConversationModal from "./NewConversationModal";
import {getOneConversation} from "../services/getOneConversation";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UserPanel from "./conversations/UserPanel";

const useStyles = makeStyles({
    conversations: {
        backgroundColor: "#F5F7FB",
        padding: "0 2rem"
    },
    searchField: {
        backgroundColor: "#E8EEFA"
    },
    listItem: {
        marginTop: "1rem"
    }
});

export default function Conversations() {
    const classes = useStyles();
    const {authentication} = useAuthorization();
    const {conversations, selectedConversation, setSelectedConversation} = useConversations();

    const getConversation = async ({_id}) => {
        const fullConversation = await getOneConversation(_id, authentication);
        if (JSON.stringify(fullConversation) !== JSON.stringify(selectedConversation)) {
            setSelectedConversation(fullConversation);
        }
    };

    return (
        <div className={classes.conversations}>
            <NewConversationModal/>
            <UserPanel />
            <h3>Chats</h3>
            <TextField placeholder="Search"
                       variant="outlined"
                       fullWidth={true}
                       className={classes.searchField}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <SearchIcon/>
                               </InputAdornment>
                           )
                       }}/>
                       <div className={classes.listItem}>
                           {Array.isArray(conversations) && conversations.map(conversation => (
                               <ConversationListItem key={conversation._id}
                                                     conversation={conversation}
                                                     getConversation={() => getConversation(conversation)}/>
                           ))}
                       </div>

        </div>
    );
}
