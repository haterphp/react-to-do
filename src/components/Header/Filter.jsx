import {
    Button,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {CalendarToday, FilterListOutlined, Star, Title} from "@material-ui/icons";
import clsx from "clsx";
import PopoverWrapper from "../Popover/Popover.jsx";

const useStyles = makeStyles(theme => ({
    filter: {
        display: "flex"
    },
    filter__control: {
        width: "100%",
    },
    filter__button: {
        height: "100%",
        marginLeft: "7px !important",
    }
}))

function Filter({className, ...props}) {

    const {filter, filter__control, filter__button} = useStyles();

    const sortProps = {
        button: (triggers) =>
            <Button variant={"outlined"}
                    className={filter__button}
                    color={"primary"}
                    {...triggers}>
                <FilterListOutlined/>
            </Button>,
        list: [
            {
                icon: <Title/>,
                title: "По названию",
                fn: () => {
                }
            },
            {
                icon: <CalendarToday/>,
                title: "По дате создания",
                fn: () => {
                }
            },
            {
                icon: <Star/>,
                title: "По преоритету",
                fn: () => {
                }
            }
        ]
    }

    return (
        <div className={clsx(filter, className)} {...props}>
            <TextField className={filter__control} id="outlined-basic" label="Введите название" variant="outlined"/>
            <PopoverWrapper {...sortProps} />
        </div>
    )
}

export default Filter;
