import { Component } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class Loading extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Backdrop open={this.props.open} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}

export default withStyles(styles)(Loading);
