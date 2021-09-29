import {Container, IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ArrowBack} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(_ => ({
    headline: {
        marginTop: 50,
        marginBottom: 25,
        display: "flex",
        alignItems: "center"
    },
    btn_back: {
        marginRight: "15px !important"
    }
}))

function Form({ children, title = "" }) {

    const {
        headline,
        btn_back
    } = useStyles();

    const history = useHistory();

    return (
        <Container maxWidth={"lg"}>
            <div className={headline}>
                <IconButton
                    className={btn_back}
                    onClick={() => history.goBack()}
                >
                    <ArrowBack/>
                </IconButton>
                <Typography variant={"h4"} component={"h1"}>{ title }</Typography>
            </div>
            { children }
        </Container>
    )
}

export default Form;
