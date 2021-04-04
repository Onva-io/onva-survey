import { Component } from 'react';
import Question from './question';
import { getLocale } from '../utils';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Centred from '../components/centred';
import { withStyles } from "@material-ui/core/styles";
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
});

class Survey extends Component {
    constructor(props) {
        super(props);

        /*
        const availableLocales = this.prop.submission.locales.map(function (locale) {
            return locale.locale;
        });
        */
        this.state = {
            previousQuestions: this.props.submission.questions,
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

    onNext() {
        this.props.onSubmit();
    }

    render() {
        const survey = this.props.submission.survey;
        const questions = this.props.submission.questions;
        const locale = getLocale(this.props.locale, survey.locales);
        const me = this;
        // const { classes } = this.props;
        const slideQuestions = (this.state.previousQuestions[0].question_id !== questions[0].question_id);

        return (
            <Centred>
                <div className="survey">
                    <h1>{locale.title}</h1>
                    {(this.props.errors && this.props.errors.message) ? (
                        <Alert severity="error">{this.props.errors.message}</Alert>
                    ) : null}
                    {slideQuestions ? (
                    <Slide
                        key={"question-" + this.state.previousQuestions[0].question_id}
                        direction="left"
                        in={false}
                        unmountOnExit
                        onExited={() => this.setState({ previousQuestions: questions })}
                    >
                        <div>
                    {this.state.previousQuestions.map(function (question) {
                        return (
                            <Question
                                key={"question-" + question.question_id}
                                question={question}
                                onChange={(response) => null}
                                locale={me.props.locale}
                            />
                        );
                    })}
                        </div>
                    </Slide>
                    ) : (
                    <Slide
                        key={"question-" + questions[0].question_id}
                        direction="right"
                        enter={slideQuestions}
                        exit={slideQuestions}
                        in={true}
                        onExited={() => console.log('exited')}
                    >
                        <div>
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
                    </Slide>
                    )}
                    <div className="actions">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.onNext()}
                            disabled={this.props.loading}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Centred>
        );
    }
};

export default withStyles(styles)(Survey);
