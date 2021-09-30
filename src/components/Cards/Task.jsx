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
import {CHANGE_PRIORITY_TASK, EDIT_TASK, REMOVE_TASK} from "../../store/tasks/actions.js";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import update from "react-addons-update";

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

const Action = ({actionsRemove, actionsPriorityChange, slug, priority}) => {

    const history = useHistory();

    console.log(priority)

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
                    history.push(`/edit/${slug}`)
                }
            },
            {
                icon: <Star color={priority ? 'warning' : "action"}/>,
                title: "Избранное",
                fn: () => actionsPriorityChange(slug)
            },
        ]
    }

    return <PopoverWrapper {...props} />
}

const Subtask = ({changeStatus, status, idx, title, slug}) => {

    const {
        subtask
    } = useStyles();

    const handleStatusChange = e => {
        changeStatus({
            idx,
            task: {
                title,
                slug,
                status: e.target.checked
            }
        })
    }

    return (
        <FormGroup className={subtask}>
            <FormControlLabel control={<Checkbox defaultChecked={status} onChange={handleStatusChange}/>}
                              label={title}/>
        </FormGroup>
    )
}

function Task({removeTask, changeTaskPriority, editTask, className, ...props}) {

    const {task} = useStyles();

    const content = props.content || null;
    const tasks = props.tasks || [];

    const handleSubtaskStatusChange = ({idx, task}) => {
        const {
            slug, priority, title, content, created_at, tasks
        } = props;
        tasks[idx] = task;
        const payload = {
            slug,
            priority,
            title,
            content,
            created_at,
            tasks
        }
        editTask(payload.slug, payload);
    }

    return (
        <Card className={clsx(task, className)}>
            <CardHeader
                title={props.title}
                subheader={format(new Date(props.created_at), "dd MMMM, yyyy", {locale: ruLocale})}
                action={<Action
                    slug={props.slug}
                    priority={props.priority}
                    actionsRemove={removeTask}
                    actionsPriorityChange={changeTaskPriority}
                />}
                titleTypographyProps={{variant: "body1"}}
                avatar={props.priority && <Star color={'warning'}/>}
            />
            {
                !content && !tasks.length ? null :
                    <CardContent>
                        {
                            content && (
                                <Typography>
                                    <MDEditor.Markdown source={props.content || null} linkTarget="_blank"/>
                                </Typography>
                            )
                        }
                        {
                            tasks.map((task, key) => <Subtask key={task.slug} idx={key}
                                                              changeStatus={handleSubtaskStatusChange} {...task} />)
                        }
                    </CardContent>
            }
        </Card>
    )
}

const mapDispatchToProps = (dispatch) => ({
    removeTask: (payload) => dispatch(REMOVE_TASK(payload)),
    editTask: (slug, body) => dispatch(EDIT_TASK(slug, body)),
    changeTaskPriority: (slug) => dispatch(CHANGE_PRIORITY_TASK(slug))
})

export default connect(null, mapDispatchToProps)(Task);
