import Router from './router';
import theme from "./theme.js";
import {ThemeProvider} from "@material-ui/styles";
import {Provider} from "react-redux";
import store from "./store.js";

function Wrap() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router/>
            </Provider>
        </ThemeProvider>
    )
}

export default Wrap;
