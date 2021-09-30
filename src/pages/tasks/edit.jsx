import {connect} from "react-redux";
import {Box, Button, TextField} from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import clsx from "clsx";
import SubtaskController from "../../components/Forms/SubtaskController.jsx";
import Layout from "../../components/Layouts/Layout.jsx";
import {makeStyles} from "@material-ui/styles";
import {useObserver} from "../../components/Forms/fn.js";
import {useState} from "react";
import {EDIT_TASK} from "../../store/tasks/actions.js";
import {useHistory} from "react-router-dom";

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

function Edit({item, editTask}) {

    const {control, editor, form__footer} = useStyles();
    const [body, setBody] = useState({title: item.title});
    const [markdown, setMarkdown] = useState(item.content);
    const [tasks, setTasks] = useState(item.tasks);
    const observer = useObserver(setBody);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        editTask(item.slug, {
            ...item,
            ...body,
            content: markdown,
            tasks,
        });
        history.push('/')
    }

    return (
        <Layout type={'form'} title={`Редактирование задачи ${item.title}`}>
            <Box component={"form"} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    required
                    className={control}
                    label={"Название"}
                    value={body.title}
                    onChange={observer.handler("title")}
                />
                <MDEditor value={markdown} onChange={setMarkdown} className={clsx(control, editor)}/>
                <SubtaskController tasks={tasks} setTasks={setTasks}/>
                <div className={form__footer}>
                    <Button variant={"contained"} color={"success"} type={'submit'}>Сохранить</Button>
                </div>
            </Box>
        </Layout>
    );
}

const mapStateToProps = ({tasks}, ownProps) => {
    const slug = ownProps.match.params.slug;
    console.log(slug)
    return {item: tasks.tasks.find(item => item.slug === slug)}
}

const mapDispatchToProps = (dispatch) => ({
    editTask: (slug, body) => dispatch(EDIT_TASK(slug, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
