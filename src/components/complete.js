import { Component } from 'react';
import { getLocale } from '../utils';

class SurveyComplete extends Component {
    render() {
        const survey = this.props.submission.survey;
        const locale = getLocale(this.props.locale, survey.locales);

        const completeText = locale.post_text || "All finished!";

        return (
            <div className="survey complete">
                <h1>{locale.title}</h1>

                <p>
                    {completeText}
                </p>
            </div>
        );
    }
}

export default SurveyComplete;
