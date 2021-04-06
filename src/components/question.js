import { Component } from 'react';
import { getLocale } from '../utils';
import {
    SingleChoiceAnswerGroup,
    MultipleChoiceAnswerGroup,
    DropdownAnswerGroup,
} from './answer-groups';
import Alert from '@material-ui/lab/Alert';

class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
        };
    }

    updateAnswers(answers) {
        const me = this;

        this.setState(
            {
                answers: answers,
            },
            function() {
                me.props.onChange(this.state);
            }
        );
    }

    render() {
        const question = this.props.question;
        const locale = getLocale(this.props.locale, question.locales);
        const me = this;
        const multiple = !(question.maximum_answers === 1);
        const style_single = 'single';
        const style_multiple = 'multiple';
        const style_dropdown = 'dropdown';

        let AnswerGroup;

        if (question.metadata._style) {
            AnswerGroup = {
                single: SingleChoiceAnswerGroup,
                multiple: MultipleChoiceAnswerGroup,
                dropdown: DropdownAnswerGroup,

            }[question.metadata._style];
        } else {
            AnswerGroup = multiple ? MultipleChoiceAnswerGroup : SingleChoiceAnswerGroup;
        }

        return (
            <div className="question">
                <h2>{locale.content}</h2>
                {locale.pre_text ? (
                    <p>{locale.pre_text}</p>
                ) : null}
                {(me.props.errors && me.props.errors.message) ? (
                    <Alert severity="error">{me.props.errors.message}</Alert>
                ) : null}
                <div className="answers">
                    <AnswerGroup
                        answers={question.answers}
                        locale={this.props.locale}
                        onChange={(state) => this.updateAnswers(state)}
                        errors={me.props.errors}
                    />
                </div>
                {locale.pre_text ? (
                    <p>{locale.post_text}</p>
                ) : null}
            </div>
        );
    }
}

export default Question;
