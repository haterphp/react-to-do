import Layout from "../components/Layouts/Layout.jsx";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Task from "../components/Cards/Task.jsx";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    list__empty_message: {
        marginTop: 25,
        color: theme.palette.text.secondary
    }
}))

const ListEmptyMessage = ({ title, content }) => {

    const { list__empty_message } = useStyles();

    return (
        <div className={list__empty_message}>
            <Typography variant={"h5"}>{title}</Typography>
            <Typography>{content}</Typography>
        </div>
    )
}

function Index({ tasks }){
    return (
        <Layout title={"Мои задачи"}>
            {
                tasks.length
                    ? tasks.map((item  , key) => <Task key={key} {...item} />)
                    : <ListEmptyMessage title={"Список задач пока что пуст"}/>
            }
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return { ...state.tasks };
}

export default connect(mapStateToProps)(Index);
