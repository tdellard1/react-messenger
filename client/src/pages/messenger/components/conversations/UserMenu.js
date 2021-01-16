import React, {useState} from "react";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {useHistory} from "react-router-dom";
import {useAuthorization} from "../../../../contexts/AuthorizationProvider";
import {useConversations} from "../../../../contexts/ConversationProvider";

export default function UserMenu() {
    const history = useHistory();
    const {removeUser} = useAuthorization();
    const [anchorEl, setAnchorEl] = useState();
    const {openModal} = useConversations();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    function logOut() {
        removeUser();
        history.push("/login");
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <MenuItem onClick={logOut}>Log Out</MenuItem>
                <MenuItem onClick={openModal}>New Conversation</MenuItem>
            </Menu>
        </>
    );
}
