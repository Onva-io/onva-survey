import { Component } from 'react';
import NotFound from './not-found';
import Survey from '../components/survey';
import SurveyIntro from '../components/intro';
import SurveyComplete from '../components/complete';
import Loading from '../components/loading';
import { withRouter } from "react-router";
import Slide from '@material-ui/core/Slide';

const useLocale = 'en';

class Serve extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            step: 0,
            introShown: false,
            surveyUuid: props.match.params.surveyUuid,
            submission: null,
            responses: {},
            errors: {},
        };
    }

    async componentDidMount() {
        const me = this;

        this.setState(
            {
                loading: true,
            },
            async function() {
                const payload = {
                    identifier: null,
                    metadata: {},
                    targeting: {},
                    locale: "en",
                    questions: [],
                };

                // FIXME what if this CORs-fails
                const response = await fetch(
                    `${process.env.REACT_APP_API_BASE}/survey/${me.state.surveyUuid}/begin/`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: 'POST',
                        body: JSON.stringify(payload),
                    }
                );

                if (response.ok) {
                    const data = await response.json();

                    me.setState({
                        submission: data,
                        loading: false,
                    });
                } else {
                    me.setState({
                        submission: false,
                        loading: false,
                    });
                }
            }
        );
    }

    onChange(data) {
        this.setState({
            responses: data,
        });
    }

    onSubmit() {
        // TODO check there are some responses
        var errors = {};
        const me = this;

        this.state.submission.questions.forEach(function (question) {
            const responses = me.state.responses[question.question_id] || [];

            if (question.minimum_answers > responses.length) {
                if (question.minimum_answers === 1) {
                    errors[question.question_id] = {
                        message: 'Please provide at least 1 answer',
                    };
                } else {
                    errors[question.question_id] = {
                        message: `Please provide at least ${question.minimum_answers} answers`,
                    };
                }
            }

            if (question.maximum_answers !== null && question.maximum_answers < responses.length) {
                if (question.maximum_answers === 1) {
                    errors[question.question_id] = {
                        message: 'Please provide at most 1 answer',
                    };
                } else {
                    errors[question.question_id] = {
                        message: `Please provide at most ${question.maximum_answers} answers`,
                    };
                }
            }
        });

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors: errors,
            });
        } else {
            // TODO submit and handle errors
            const questions = this.state.submission.questions
                .filter(function (question) {
                    return Boolean(me.state.responses[question.question_id]);
                })
                .map(function (question) {
                    return {
                        question_id: question.question_id,
                        answers: me.state.responses[question.question_id],
                    };
                });

            const payload = {
                questions: questions,
            };

            this.setState(
                {
                    loading: true,
                },
                async function() {
                    // FIXME handle 404 for broken submission
                    const response = await fetch(
                        `${process.env.REACT_APP_API_BASE}/survey/${me.state.surveyUuid}/submit/${me.state.submission.submission_uuid}`,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: 'POST',
                            body: JSON.stringify(payload),
                        }
                    );

                    const data = await response.json();

                    if (response.ok) {
                        me.setState({
                            step: this.state.step + 1,
                            responses: {},
                            submission: data,
                            loading: false,
                        });
                    } else if (response.status === 400) {
                        let errors = {
                            message: "",
                            questions: {},
                        };

                        if (data.errors) {
                            data.errors.forEach(function (error) {
                                const fields = error.loc;

                                if (fields.length >= 2) {
                                    // questions.N.answers
                                    const questionIndex = fields[1];

                                    // questions is the payload questions
                                    const question = questions[questionIndex];

                                    if (!errors.questions[question.question_id]) {
                                        errors.questions[question.question_id] = {
                                            message: "",
                                            answers: {},
                                        };
                                    }

                                    errors.questions[question.question_id].message = 'Please check your answers';

                                    // suggests an issue with answers
                                    if (fields.length > 2) {
                                        const answerIndex = fields[3];
                                        const answer = question.answers[answerIndex];
                                        let message = 'Please check your answers';

                                        if (fields[4] === 'more_details') {
                                            message = 'Please provide some details';
                                        }

                                        errors.questions[question.question_id].answers[answer.answer_id] = {
                                            message: message,
                                        };
                                    }
                                } else {
                                    // unknown fields
                                    errors.message = 'Please check your answers';
                                }
                            });
                        } else {
                            // Questions have already been submitted - $question_id
                            errors.message = 'An error has occurred, please reload';
                        }

                        me.setState({
                            errors: errors,
                            loading: false,
                        });
                    } else {
                        // bigger problems
                        me.setState({
                            errors: {
                                message: 'Please try again in a moment',
                            },
                            loading: false,
                        });
                    }
                }
            );
        }
    }

    render() {
        if (this.state.submission === false) {
            return (
                <NotFound/>
            );
        }

        if (this.state.submission === null) {
            return (<Loading open={true} />);
        }

        return (
            <>
                {(this.state.step <= 1 && !this.state.introShown) ? (
                    <Slide 
                        direction={this.state.step === 0 ? "up": "down"}
                        in={this.state.step === 0}
                        unmountOnExit
                        onExited={() => this.setState({ introShown: true })}
                    >
                        <SurveyIntro
                            survey={this.state.submission.survey}
                            locale={useLocale}
                            onNext={() => this.setState({ step: 1 })}
                        />
                    </Slide>
                ) : null}
                {(this.state.submission.questions.length && this.state.step >= 1) ? (
                    <Slide
                        direction={this.state.submission.questions.length > 0 ? "up": "down"}
                        in={this.state.submission.questions.length > 0}
                        unmountOnExit
                    >
                        <Survey
                            submission={this.state.submission}
                            onChange={(data) => this.onChange(data)}
                            onSubmit={() => this.onSubmit()}
                            locale={useLocale}
                            errors={this.state.errors}
                            loading={this.state.loading}
                        />
                    </Slide>
                ) : null}
                {!this.state.submission.questions.length ? (
                <Slide direction="up" in={true}>
                    <SurveyComplete
                        submission={this.state.submission}
                        locale={useLocale}
                    />
                </Slide>
                ) : null}
            </>
        );
    }
}

export default withRouter(Serve);
