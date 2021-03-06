import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import Index from "./pages";
import Create from "./pages/tasks/create.jsx";
import Edit from "./pages/tasks/edit.jsx";
import Page404 from "./pages/404.jsx";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} component={Index}/>
                <Route exact path={"/create"} component={Create}/>
                <Route exact path={"/edit/:slug"} component={Edit}/>
                <Route path={"*"} component={Page404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
