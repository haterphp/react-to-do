import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    Typography
} from "@material-ui/core";
import {format} from "date-fns";
import {Delete, Edit, MoreVert, Star} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import PopoverWrapper from "../Popover/Popover.jsx";
import clsx from "clsx";
import MDEditor from "@uiw/react-md-editor";
import ruLocale from 'date-fns/locale/ru';
import {connect} from "react-redux";
import {REMOVE_TASK} from "../../store/tasks/actions.js";

const useStyles = makeStyles(_ => ({
    task: {
        "&:not(:first-of-type)": {
            marginTop: 25,
        }
    },
    subtask: {
        marginTop: 15,
        userSelect: "none"
    }
}))

const Action = ({ actionsRemove, slug }) => {

    console.log(actionsRemove)

    const props = {
        button: (triggers) => (
            <IconButton aria-label="settings" {...triggers}>
                <MoreVert/>
            </IconButton>
        ),
        list: [
            {
                icon: <Delete/>,
                title: "Удалить",
                fn: () => actionsRemove(slug)
            },
            {
                icon: <Edit/>,
                title: "Изменить",
                fn: () => {
                }
            },
            {
                icon: <Star/>,
                title: "Приоритет",
                fn: () => {
                }
            },
        ]
    }

    return <PopoverWrapper {...props} />
}

const Subtask = ({status, title}) => {

    const {
        subtask
    } = useStyles();

    return (
        <FormGroup className={subtask}>
            <FormControlLabel control={<Checkbox defaultChecked={status} />} label={title} />
        </FormGroup>
    )
}

function Task({ removeTask, className, ...props}) {

    const {task} = useStyles();

    return (
        <Card className={clsx(task, className)}>
            <CardHeader
                title={props.title}
                subheader={format(props.created_at, "dd MMMM, yyyy", {locale: ruLocale})}
                action={<Action slug={props.slug} actionsRemove={removeTask} />}
            />
            {
                !props.content && !props.tasks ? null :
                    <CardContent>
                        <Typography>
                            <MDEditor.Markdown source={props.content || ""} linkTarget="_blank"/>
                        </Typography>
                        {
                            (props.tasks || [])
                                .map((task, key) => <Subtask key={key} {...task} />)
                        }
                    </CardContent>
            }
        </Card>
    )
}

const mapDispatchToProps = (dispatch) => ({
    removeTask: (payload) => dispatch(REMOVE_TASK(payload))
})

export default connect(null, mapDispatchToProps)(Task);
