import { Component } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import { SingleChoiceAnswer, MultipleChoiceAnswer } from './answers';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class SingleChoiceAnswerGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer_id: "",
            more_detail: "",
        };
    }

    handleChange(e) {
        const answer_id = e.target.value;
        const me = this;

        this.setState(
            {
                answer_id: answer_id,
            },
            function () {
                me.props.onChange([ this.state ]);
            }
        );
    }

    updateAnswer(answer, response) {
        const me = this;

        this.setState(
            {
                more_detail: response.more_detail,
            },
            function () {
                me.props.onChange([ this.state ]);
            }
        );
    }

    render() {
        const me = this;

        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Choose one</FormLabel>
                <RadioGroup
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.answer_id}
                >
                {
                    this.props.answers.map(function (answer) {
                        return (
                            <SingleChoiceAnswer
                                key={"answer-" + answer.answer_id}
                                value={answer.answer_id}
                                answer={answer}
                                locale={me.props.locale}
                                checked={me.state.answer_id === answer.answer_id}
                                errors={me.props.errors && me.props.errors.answers && me.props.errors.answers[answer.answer_id]}
                                onChange={(response) => me.updateAnswer(answer, response)}
                            />
                        );
                    })
                }
                </RadioGroup>
            </FormControl>
        );
    }
}

class MultipleChoiceAnswerGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: {},
        };
    }

    updateAnswer(answer, response) {
        // remove answer from answers if present
        let answers = Object.assign({}, this.state.answers);

        if (response.checked) {
            answers[answer.answer_id] = {
                answer_id: answer.answer_id,
                more_detail: response.more_detail,
            };
        } else {
            delete answers[answer.answer_id];
        }

        const me = this;

        this.setState(
            {
                answers: answers,
            },
            function () {
                me.props.onChange(Object.values(this.state.answers));
            }
        );
    }

    render() {
        const me = this;

        return (
            <>
            {
                this.props.answers.map(function (answer) {
                    return (
                        <MultipleChoiceAnswer
                            key={"answer-" + answer.answer_id}
                            value={answer.answer_id}
                            answer={answer}
                            locale={me.props.locale}
                            onChange={(response) => me.updateAnswer(answer, response)}
                            errors={me.props.errors && me.props.errors.answers && me.props.errors.answers[answer.answer_id]}
                        />
                    );
                })
            }
            </>
        );
    }
}

export {
    SingleChoiceAnswerGroup,
    MultipleChoiceAnswerGroup,
};
