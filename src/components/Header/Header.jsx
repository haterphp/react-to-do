import {makeStyles} from "@material-ui/styles";
import {Button, Container} from "@material-ui/core";
import Filter from "./Filter.jsx";
import {Add} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    header: {
        padding: "15px 0",
        display: "flex",

    },
    filter: {
        width: "100%"
    },
    btn_add: {
        marginLeft: "7px !important",
    }
}))

function Header() {

    const {
        header, filter, btn_add
    } = useStyles();

    const history = useHistory();

    return (
        <Container maxWidth={"lg"}>
            <header className={header}>
                <Filter className={filter}/>
                <Button variant={"outlined"}
                        className={btn_add}
                        onClick={() => history.push('/create')}>
                    <Add/>
                </Button>
            </header>
        </Container>
    )
}

export default Header;
