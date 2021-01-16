import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAuthorization} from "../../../contexts/AuthorizationProvider";
import Card from '@material-ui/core/Card';
import imageOne from "../../../images/stock-image-0.png";
import imageTwo from "../../../images/stock-image-1.png";
import imageThree from "../../../images/stock-image-2.png";
import imageFour from "../../../images/stock-image-3.png";
import imageFive from "../../../images/stock-image-4.png";
import imageSix from "../../../images/stock-image-5.png";
import imageSeven from "../../../images/stock-image-6.png";
import imageEight from "../../../images/stock-image-7.png";

const useStyles = makeStyles({
    conversationListItem: {
        display: "flex",
        flexDirection: "row",
        border: "1px solid transparent",

        "&:hover": {
            backgroundColor: "#E8EEfA",
        }
    },
    avatar: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        margin: "1rem",
        zIndex: 1
    },
    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    bold: {
        fontWeight: 600
    },
    light: {
        opacity: 0.5,
        fontSize: "12px"
    },
    card: {
        marginBottom: ".5rem",
    }
});


export default function ConversationListItem({conversation, getConversation}) {
    const classes = useStyles();
    const {authentication} = useAuthorization();
    const stockImages = [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix, imageSeven, imageEight];

    function Receiver() {
        const participant = conversation.participants.filter(participant => participant._id !== authentication.id)[0];
        return (
            <span className={classes.bold}>{participant.username}</span>
        );
    }

    function randomNumber() {
        return Math.floor(Math.random() * stockImages.length);
    }

    return (
        <Card className={classes.card}>
            <div className={classes.conversationListItem} onClick={getConversation}>
                <img src={stockImages[randomNumber()]} alt="stockImage" className={classes.avatar}/>
                <div className={classes.details}>
                    <Receiver />
                    <span className={classes.light}>{conversation.lastMessage && conversation.lastMessage.content}</span>
                </div>
            </div>
        </Card>

    )
}
