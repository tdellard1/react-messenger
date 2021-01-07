import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    otherAuth: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: "2rem"
    },
    otherAuth_text: {
      opacity: 0.5
    },
    otherAuth_button: {
      backgroundColor: "white",
      marginLeft: "2rem",
      '& .MuiButton-label': {
        color: "#3A8DFF",
        margin: ".5rem 1rem"
      }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        margin: "0 20%"
    },
    greeting: {
        alignSelf: "flex-start",
        fontWeight: 600
    },
    formFields: {
        marginBottom: "1.5rem"
    },
    lastField: {
        marginBottom: "4rem"
    },
    button: {
        '& .MuiButton-label': {
            margin: ".5rem 2rem"
        }
    }
});

export default useStyles;
