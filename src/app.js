import { Component } from 'react';
import {
      BrowserRouter as Router,
      Switch,
      Route,
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
