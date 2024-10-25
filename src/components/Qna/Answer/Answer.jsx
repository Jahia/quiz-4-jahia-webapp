import React from 'react';
import PropTypes from 'prop-types';

import {Radio, Checkbox, FormControlLabel} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {makeStyles} from '@material-ui/core/styles';
import classnames from 'clsx';

const useStyles = makeStyles(theme => ({
    answerGroup: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '.showResult &': {
            '&.checked': {
                backgroundColor: theme.palette.background.checkedAnswer,
                borderRadius: theme.geometry.checkedAnswer.borderRadius,
                '& [class*="-MuiTypography-body1"]': {
                    color: theme.palette.grey[900]
                },
                '& + div::before': {
                    borderTop: '2px solid transparent'
                },
                '&:last-child': {
                    borderBottom: '2px solid transparent'
                },
                '::before': {
                    borderTop: '2px solid transparent'
                }
            }
        }
    },
    checkGroup: {
        position: 'relative',
        height: '28px', // '1.5rem',
        padding: '2px 4px 2px 2px', // '.15rem .25rem .15rem .15rem',
        marginLeft: '-32px',
        opacity: 0,
        // Transform: none,
        transition: theme.transitions.create(['opacity'], {
            easing: theme.transitions.easing.easeOut
        }),
        borderRadius: '5px 0px 0px 5px',
        backgroundColor: theme.palette.grey[300],
        zIndex: 4,
        '.showResult &': {
            opacity: 1
        },
        '&::after': {
            content: '""',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '14px 0 14px 18px', // '.9rem 0 .9rem 1.15rem',
            position: 'absolute',
            top: 0,
            // Right:'-1.1rem',
            left: '30px', // '1.9rem',
            borderColor: `transparent transparent transparent ${theme.palette.grey[300]}`
        },
        '&.valid': {
            backgroundColor: theme.palette.primary.main,
            color: 'rgba(255, 255, 255, 0.87)',
            '&::after': {
                borderColor: `transparent transparent transparent ${theme.palette.primary.main}`
            }
        },
        '& svg': {
            verticalAlign: 'unset',
            overflow: 'unset'
        }
    },
    labelGroup: {
        margin: 'unset',
        marginLeft: '12px',
        flexGrow: 1
    }
}));

export const Answer = props => {
    const classes = useStyles(props);
    const {qna, qnaDispatch, id} = props;
    const [answer] = qna.answers.filter(answer => answer.id === id);

    const isValid = answer.isAnswer || (qna.notUsedForScore ? answer.checked : false);
    const handleChange = () =>
        qnaDispatch({
            case: 'TOGGLE_ANSWER',
            payload: {
                answer
            }
        });

    const Icon = isValid ? CheckIcon : ClearIcon;

    const Control = qna.inputType === 'checkbox' ? Checkbox : Radio;

    return (
        <div className={classnames(
            classes.answerGroup,
            (answer.checked ? 'checked' : '')
        )}
        >
            <div className={classnames(
                classes.checkGroup,
                (isValid ? 'valid' : '')
            )}
            >
                <Icon/>
            </div>
            <FormControlLabel
                className={classes.labelGroup}
                control={<Control id={answer.id}/>}
                label={answer.label}
                labelPlacement="end"
                checked={answer.checked}
                onChange={handleChange}
            />
        </div>
    );
};

Answer.propTypes = {
    qna: PropTypes.object.isRequired,
    qnaDispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
