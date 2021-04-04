import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import NotFound from './views/not-found';
import Serve from './views/serve';
import { withStyles } from "@material-ui/core/styles";
import './app.scss';

const styles = theme => ({
    main: {
        padding: theme.spacing(2),
    },
});

class App extends Component {
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => (window.location = process.env.REACT_APP_API_BASE.replace('api', 'www'))} />
                        <Route path="/:surveyUuid">
                            <Serve />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </main>
        );
    }
}

export default withStyles(styles)(App);
