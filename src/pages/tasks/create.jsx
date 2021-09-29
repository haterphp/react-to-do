import Layout from "../../components/Layouts/Layout.jsx";
import {Box, Button, TextField} from "@material-ui/core";
import {useObserver} from "../../components/Forms/fn.js";
import {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import MDEditor from "@uiw/react-md-editor";
import clsx from "clsx";
import SubtaskController from "../../components/Forms/SubtaskController.jsx";
import {connect} from "react-redux";
import {ADD_TASK} from "../../store/tasks/actions.js";
import {useHistory} from "react-router-dom";


const initBody = {
    title: ""
}

const useStyles = makeStyles(_ => ({
    control: {
        width: "100%"
    },
    editor: {
        margin: "25px 0"
    },
    form__footer: {
        marginTop: 25
    }
}))

function Create({ addTask }){

    const { control, editor, form__footer } = useStyles();
    const [body, setBody] = useState(initBody);
    const [markdown, setMarkdown] = useState("");
    const [tasks, setTasks] = useState([]);
    const observer = useObserver(setBody);
    const history = useHistory();

    const handleSubmit = () => {
        const payload = {
            slug: (Math.random() + 1).toString(36).substring(7),
            ...body,
            tasks,
            created_at: new Date(),
            content: markdown
        }
        addTask(payload);
        history.push('/');
    }

    return (
        <Layout type={'form'} title={"Создание задачи"}>
            <Box component={"form"} noValidate autoComplete="off">
                <TextField
                    required
                    className={control}
                    label={"Название"}
                    onChange={observer.handler("title")}
                />
                <MDEditor value={markdown} onChange={setMarkdown} className={clsx(control, editor)} />
                <SubtaskController tasks={tasks} setTasks={setTasks} />
                <div className={form__footer}>
                    <Button variant={"contained"} color={"success"} onClick={handleSubmit}>Сохранить</Button>
                </div>
            </Box>
        </Layout>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addTask: (payload) => dispatch(ADD_TASK(payload))
})

export default connect(null, mapDispatchToProps)(Create);
