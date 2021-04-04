import { Component } from 'react';
import Centred from '../components/centred';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    centred: {
        textAlign: 'center',
    },
});

class NotFound extends Component {
    render () {
        const { classes } = this.props;

        return (
            <Centred>
                <div className={classes.centred}>
                    <img src="https://static.onva.io/logo-200x47.png" alt="onva logo"/>
                    <h1>Survey not found</h1>
                    <p>
                        We can't find the survey that you've referenced.
                    </p>
                </div>
            </Centred>
        );
    }
}

export default withStyles(styles)(NotFound);
