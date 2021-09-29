import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles(({palette}) => ({
    wrap: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    headline: {
        marginBottom: 25,
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}))

function Page404(){

    const { wrap, headline } = useStyles();
    const { pathname } = useLocation();

    const history = useHistory();

    return (
        <div className={wrap}>
            <div className={headline}>
                <Typography variant={"h3"} component={"h1"}>Упс... Что-то пошло не так!</Typography>
                <Typography variant={"h3"} component={"h1"}>Cтраницы {pathname} не существует</Typography>
            </div>
            <Button variant={"text"} onClick={() => history.push('/')}>Вернуться на главную</Button>
        </div>
    )
}

export default Page404;
