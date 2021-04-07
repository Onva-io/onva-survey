import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    outer: {
        minHeight: '100vh',
        maxWidth: '800px',
    },
    inner: {
    },
});

class Centred extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.outer}
            >
                <Grid item xs="auto" className={classes.inner}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Centred);
