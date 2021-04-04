import { Component } from 'react';
import { getLocale } from '../utils';
import Centred from '../components/centred';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    logo: {
        textAlign: 'center',
    },
});

class SurveyComplete extends Component {
    render() {
        const survey = this.props.submission.survey;
        const locale = getLocale(this.props.locale, survey.locales);

        const completeText = locale.post_text || "Thank you for completing this survey!";

        const { classes } = this.props;

        return (
            <Centred>
                <div className={classes.logo}>
                    <img src="https://static.onva.io/logo-200x47.png" alt="onva logo"/>
                </div>
                <div className="survey complete">
                    <h1>{locale.title}</h1>

                    <p>
                        {completeText}
                    </p>
                </div>
            </Centred>
        );
    }
}

export default withStyles(styles)(SurveyComplete);
