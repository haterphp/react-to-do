import {
    Button,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {CalendarToday, Check, CheckBox, FilterListOutlined, Star, Title} from "@material-ui/icons";
import clsx from "clsx";
import PopoverWrapper from "../Popover/Popover.jsx";
import {connect} from "react-redux";
import {SET_FILTER, SET_FILTER_NAME} from "../../store/filter/actions.js";

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

function Filter({ filters, setFilter, setFilterName, className, ...props}) {

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
                fn: () => setFilter('title'),
                mixin: filters.includes("title") && <Check color={"action"}/>
            },
            {
                icon: <CalendarToday/>,
                title: "По дате создания",
                fn: () => setFilter('created_at'),
                mixin: filters.includes("created_at") && <Check color={"action"}/>
            }
        ],
        settings: {
            PaperProps: {
                style: {
                    width: 250
                }
            }
        }
    }

    return (
        <div className={clsx(filter, className)} {...props}>
            <TextField
                className={filter__control}
                label="Введите название"
                variant="outlined"
                onChange={e => setFilterName(e.target.value)}
            />
            {/*<PopoverWrapper {...sortProps} />*/}
        </div>
    )
}

const mapStatesToProps = ({ filter }) => ({
    filters: filter.filters
})

const mapDispatchToProps = (dispatch) => ({
    setFilter: (filter) => dispatch(SET_FILTER(filter)),
    setFilterName: (name) => dispatch(SET_FILTER_NAME(name))
})

export default connect(mapStatesToProps, mapDispatchToProps)(Filter);
