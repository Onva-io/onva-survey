import { Component } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import { SingleChoiceAnswer, MultipleChoiceAnswer } from './answers';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getLocale } from '../utils';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    formControl: {
        width: '100%',
    },
    answer: {
    },
    moreDetail: {
        marginTop: theme.spacing(1),
        display: 'block',
    },
});

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
                <FormLabel required component="legend">Choose one</FormLabel>
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

class DropdownAnswerGroup extends Component {
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
                more_detail: "",
            },
            function () {
                me.props.onChange([ this.state ]);
            }
        );
    }

    handleMoreDetailsChange(e) {
        const me = this;

        this.setState(
            {
                more_detail: e.target.value
            },
            function() {
                me.props.onChange([ this.state ]);
            }
        );
    }

    render() {
        const me = this;
        const { classes } = this.props;

        const activeAnswer = this.props.answers.filter(function (answer) {
            return answer.answer_id === me.state.answer_id;
        });

        return (
            <FormControl className={classes.formControl}>
                <InputLabel
                    required
                    id={this.props.answers[0].answer_id + '-label'}
                >Choose one</InputLabel>
                <Select
                    labelId={this.props.answers[0].answer_id + '-label'}
                    required
                    value={this.state.answer_id}
                    onChange={(e) => this.handleChange(e)}
                >
                {
                    this.props.answers.map(function (answer) {
                        const locale = getLocale(me.props.locale, answer.locales);

                        return (
                    <MenuItem value={answer.answer_id}>{locale.content}</MenuItem>
                        );
                    })
                }
                </Select>
            {(activeAnswer.length > 0 && activeAnswer[0].answer_id == this.state.answer_id && activeAnswer[0].more_detail) ? (
                <TextField
                    className={classes.moreDetail}
                    variant="outlined"
                    label="Provide more details"
                    value={this.state.more_detail}
                    onChange={(e) => this.handleMoreDetailsChange(e)}
                    error={Boolean(this.props.errors && this.props.errors.message)}
                    helperText={this.props.errors ? this.props.errors.message : null}
                    required
                />
            ) : null}
            </FormControl>
        );
    }
}

DropdownAnswerGroup = withStyles(styles)(DropdownAnswerGroup);

export {
    SingleChoiceAnswerGroup,
    MultipleChoiceAnswerGroup,
    DropdownAnswerGroup,
};
