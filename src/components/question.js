import { Component } from 'react';
import { getLocale } from '../utils';
import { SingleChoiceAnswerGroup, MultipleChoiceAnswerGroup } from './answer-groups';
import RadioGroup from '@material-ui/core/RadioGroup';
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
        const AnswerGroup = multiple ? MultipleChoiceAnswerGroup : SingleChoiceAnswerGroup;

        return (
            <div className="question">
                <h2>{locale.content}</h2>
                {locale.pre_text && (
                    <p>{locale.pre_text}</p>
                )}
                {me.props.errors && me.props.errors.message && (
                    <Alert severity="error">{me.props.errors.message}</Alert>
                )}
                <div className="answers">
                    <AnswerGroup
                        answers={question.answers}
                        locale={this.props.locale}
                        onChange={(state) => this.updateAnswers(state)}
                        errors={me.props.errors}
                    />
                </div>
                {locale.pre_text && (
                    <p>{locale.post_text}</p>
                )}
            </div>
        );
    }
}

export default Question;