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

const taskFilter = (tasks, settings) => {
    let sortedTasks = [ ...tasks ];
    sortedTasks = sortedTasks.filter(item => item.title.includes(settings.name))
    settings.sort.forEach((key) => sortedTasks = sortedTasks.sort((a, b) => {
        if(a[key] < b[key]) { return -1; }
        if(a[key] > b[key]) { return 1; }
        return 0;
    }));
    sortedTasks = sortedTasks.sort((a, b) => b.priority - a.priority);
    return sortedTasks;
}

const ListEmptyMessage = ({ title, content }) => {

    const { list__empty_message } = useStyles();

    return (
        <div className={list__empty_message}>
            <Typography variant={"h5"}>{title}</Typography>
            <Typography>{content}</Typography>
        </div>
    )
}

function Index({ tasks, filters }){
    return (
        <Layout title={"Мои задачи"}>
            {
                taskFilter(tasks, filters).length
                    ? taskFilter(tasks, filters).map((item) => <Task key={item.slug} {...item} />)
                    : <ListEmptyMessage title={"Список задач пусть"} content={"Попробуйте выбрать другие настройки фильтров или добавить новую задачу"}/>
            }
        </Layout>
    )
}

const mapStateToProps = ({ tasks, filter }) => {
    console.log(tasks)
    return {
        ...tasks,
        filters: {
            name: filter.name,
            sort: filter.filters
        }
    };
}

export default connect(mapStateToProps)(Index);
