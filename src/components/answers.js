import { Component } from 'react';
import { getLocale } from '../utils';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    answer: {
    },
    moreDetail: {
        display: 'block',
    },
});

class SingleChoiceAnswer extends Component {
    constructor() {
        super();

        this.state = {
            more_detail: "",
        };
    }

    handleMoreDetailsChange(e) {
        const me = this;

        this.setState(
            {
                more_detail: e.target.value
            },
            function() {
                me.props.onChange(this.state);
            }
        );
    }

    render() {
        const answer = this.props.answer;
        const locale = getLocale(this.props.locale, answer.locales);
        const { classes } = this.props;

        // FIXME: currently if an error appears then it must be associated with
        // the more details, so we make that assumption

        return (
            <div className={classes.answer}>
                <FormControlLabel
                    control={
                        <Radio
                            value={answer.answer_id}
                        />
                    }
                    label={locale.content}
                />
                {(this.props.checked && answer.more_detail) ? (
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
            </div>
        );
    }
}

class MultipleChoiceAnswer extends Component {
    constructor() {
        super();

        this.state = {
            checked: false,
            more_detail: "",
        };
    }

    handleCheckedChange(e) {
        const me = this;

        this.setState(
            {
                checked: e.target.checked
            },
            function() {
                me.props.onChange(this.state);
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
                me.props.onChange(this.state);
            }
        );
    }

    render() {
        const answer = this.props.answer;
        const locale = getLocale(this.props.locale, answer.locales);
        const { classes } = this.props;

        // FIXME: currently if an error appears then it must be associated with
        // the more details, so we make that assumption

        return (
            <div className={classes.answer}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) => this.handleCheckedChange(e) }
                            color="primary"
                        />
                    }
                    label={locale.content}
                />
                {(this.state.checked && answer.more_detail) ? (
                    <TextField
                        variant="outlined"
                        label="Provide more details"
                        value={this.state.more_detail}
                        onChange={(e) => this.handleMoreDetailsChange(e)}
                        error={Boolean(this.props.errors && this.props.errors.message)}
                        helperText={this.props.errors && this.props.errors.message}
                        required
                    />
                ) : null}
            </div>
        );
    }
}

SingleChoiceAnswer = withStyles(styles)(SingleChoiceAnswer);
MultipleChoiceAnswer = withStyles(styles)(MultipleChoiceAnswer);

export {
    SingleChoiceAnswer,
    MultipleChoiceAnswer,
};
