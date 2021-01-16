import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import stockImage from "../../../images/stock-image-0.png";

const useStyles = makeStyles({
    left: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        width: "100%",
        margin: ".5rem"
    },
    right: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-end",
        margin: ".5rem"
    },
    avatar: {
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        margin: "0 .5rem 1rem"
    },
    messageContainer: {
        display: "flex",
        flexDirection: "column"
    },
    nameAndTime: {
        color: "#BDCCE2",
        fontSize: "10px",
        marginBottom: ".25rem"
    },
    alignRight: {
        alignSelf: "flex-end"
    },
    receiverContent: {
        fontWeight: 600,
        fontSize: ".75rem",
        background: "linear-gradient(to right, rgba(24, 140, 255, 0.85), rgba(77, 192, 255, 0.85))",
        padding: ".5rem",
        color: "white",
        borderRadius: "0 12px 12px 12px"
    },
    senderContent: {
        fontWeight: 600,
        fontSize: ".75rem",
        backgroundColor: "#F4F6FA",
        padding: ".5rem",
        color: "#91A3C1",
        borderRadius: "12px 12px 0 12px",
    }
});

export default function Message({content, isCurrentUser, sender, time}) {
    const classes = useStyles();

    const ReceiverMessage = () => (
        <div className={classes.left}>
            <img src={stockImage} alt="stockImage" className={classes.avatar}/>
                <div className={classes.messageContainer}>
                    <b className={classes.nameAndTime}>{`${sender.username} ${time}`}</b>
                    <span className={classes.receiverContent}>{content}</span>
                </div>
        </div>
    );
    const SenderMessage = () => (
        <div className={classes.right}>
                <div className={classes.messageContainer}>
                    <b className={`${classes.nameAndTime} ${classes.alignRight}`}>{time}</b>
                    <span className={classes.senderContent}>{content}</span>
                </div>
        </div>
    );

    return isCurrentUser ? <SenderMessage /> : <ReceiverMessage />;
}
