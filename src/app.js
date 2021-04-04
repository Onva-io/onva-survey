import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import NotFound from './views/not-found';
import Serve from './views/serve';
import './app.scss';

class App extends Component {
    render() {
        return (
            <div>
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
        );
    }
}

export default App;
