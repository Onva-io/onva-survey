import { Component } from 'react';
import Question from './question';
import { getLocale } from '../utils';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

class Survey extends Component {
    constructor(props) {
        super(props);

        /*
        const availableLocales = this.prop.submission.locales.map(function (locale) {
            return locale.locale;
        });
        */
        this.state = {
            responses: {},
        };
    }

    trackResponse(question, response) {
        const thisResponse = {};
        thisResponse[question.question_id] = response.answers;
        const responses = Object.assign(this.state.responses, thisResponse);
        const me = this;

        this.setState(
            {
                responses: responses,
            },
            function () {
                me.props.onChange(this.state.responses);
            }
        );
    }

    render() {
        const survey = this.props.submission.survey;
        const questions = this.props.submission.questions;
        const locale = getLocale(this.props.locale, survey.locales);
        const me = this;

        return (
            <div className="survey">
                <h1>{locale.title}</h1>
                {this.props.errors && this.props.errors.message && (
                    <Alert severity="error">{this.props.errors.message}</Alert>
                )}
                <div className="questions">
                {questions.map(function (question) {
                    return (
                        <Question
                            key={"question-" + question.question_id}
                            question={question}
                            onChange={(response) => me.trackResponse(question, response)}
                            locale={me.props.locale}
                            errors={me.props.errors.questions && me.props.errors.questions[question.question_id]}
                        />
                    );
                })}
                </div>
                <div className="actions">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.onSubmit()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
};

export default Survey;