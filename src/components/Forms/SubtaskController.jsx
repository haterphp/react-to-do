import {Button, IconButton, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Delete, MoreVert} from "@material-ui/icons";
import PopoverWrapper from "../Popover/Popover.jsx";
import update from 'react-addons-update';
import {useEffect, useState} from "react";
import {useObserver} from "./fn.js";

const useStyles = makeStyles(_ => ({
    subtask: {
        display: "flex",
        marginTop: 15,
        alignItems: "center"
    },
    control: {
        width: "100%"
    },
    btn: {
        marginLeft: "15px !important"
    }
}));

const Task = ({ idx, task, handleChange }) => {

    const { subtask, control, btn } = useStyles();

    const [body, setBody] = useState(task);
    const observer = useObserver(setBody);

    const popoverProps = {
        button: (triggers) => (
            <IconButton aria-label="settings" className={btn} {...triggers}>
                <MoreVert/>
            </IconButton>
        ),
        list: [
            {
                icon: <Delete/>,
                title: "Удалить",
                fn: () => {}
            }
        ]
    }

    useEffect(_ => { handleChange({ idx, body }) }, [body]);

    return (
        <div className={subtask}>
            <TextField
                required
                className={control}
                label={"Задача"}
                value={task.value}
                onChange={observer.handler('title')}
            />
            <PopoverWrapper {...popoverProps} />
        </div>
    )
}

const instance = {
    title: "",
    status: false
}

function SubtaskController({ tasks, setTasks }){

    const handleClick = () => {
        setTasks(tasks => ([
            ...tasks,
            instance
        ]));
    }

    const handleChange = ({ idx, body }) => {
        const _format = (body) =>
            Object.entries(body)
                .map(([key, value]) => [key, { $set: value } ])
                .reduce((current, [key, value]) => ({ ...current, [key]: value }), {});
        setTasks(tasks =>
            update(tasks, {[idx]: _format(body)})
        )
    }

    return (
        <>
            <Button variant={"outlined"}
                    color={"primary"}
                    onClick={handleClick}
            > Добавить подзадачу </Button>
            {
                tasks.map((task, idx) => <Task key={idx} handleChange={handleChange} task={task} idx={idx} />)
            }
        </>
    )
}

export default SubtaskController;
