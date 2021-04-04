import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import NotFound from './views/not-found';
import Serve from './views/serve';
import { withStyles } from "@material-ui/core/styles";
import './app.scss';

const styles = theme => ({
    outer: {
    },
    inner: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
});

class App extends Component {
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.outer}>
                <div className={classes.inner}>
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
                </div>
            </main>
        );
    }
}

export default withStyles(styles)(App);
