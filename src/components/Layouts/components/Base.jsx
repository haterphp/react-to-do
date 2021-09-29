import Header from "../../Header/Header.jsx";
import {makeStyles} from "@material-ui/styles";
import {Container, Typography} from "@material-ui/core";

const useStyles = makeStyles(_ => ({
    wrap: {
        marginTop: 50
    },
    headline: {
        display: "block",
        marginBottom: "25px !important"
    }
}))

function Base({ children, title }) {

    const { wrap, headline } = useStyles();

    return (
        <>
            <Header/>
            <div className={wrap}>
                <Container maxWidth={"lg"}>
                    <Typography variant={"h4"} component={"h1"} className={headline}>{ title }</Typography>
                    { children }
                </Container>
            </div>
        </>
    )
}

export default Base;
