import { Component } from 'react';
import { getLocale } from '../utils';
import Button from '@material-ui/core/Button';
import Centred from '../components/centred';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    logo: {
        textAlign: 'center',
    },
});

class SurveyIntro extends Component {
    render() {
        const survey = this.props.survey;
        const locale = getLocale(this.props.locale, survey.locales);
        const { classes } = this.props;

        return (
            <Centred>
                <div className={classes.logo}>
                    <img src="https://static.onva.io/logo-200x47.png"/>
                </div>
                <div className="survey intro">
                    <h1>{locale.title}</h1>

                    <p>{locale.pre_text}</p>

                    <div className="actions">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.onNext()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Centred>
        );
    }
};

export default withStyles(styles)(SurveyIntro);
