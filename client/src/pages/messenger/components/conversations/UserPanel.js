import React from "react";
import image from "../../../../images/stock-image-5.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useAuthorization} from "../../../../contexts/AuthorizationProvider";
import UserMenu from "./UserMenu";


const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "2rem 0 "
    },
    avatar: {
        width: "50px",
        height: "50px",
        marginRight: "1rem",
        borderRadius: "50%",
        zIndex: 1,
    },
    spacer: {
        flexGrow: 1
    }
});

export default function UserPanel() {
    const classes = useStyles();
    const {authentication} = useAuthorization();

    return (
        <div className={classes.root}>
            <img src={image} alt="image" className={classes.avatar}/>
            <span className={classes.spacer}>{authentication.username}</span>
            <UserMenu />
        </div>
    );
}
