import { Component } from 'react';
import { getLocale } from '../utils';
import Button from '@material-ui/core/Button';

class SurveyIntro extends Component {
    render() {
        const survey = this.props.survey;
        const locale = getLocale(this.props.locale, survey.locales);

        return (
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
        );
    }
};

export default SurveyIntro;
