import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
const Joi = require('joi');

const customConstraintOptionalExclusiveOr = Joi.object({
    'example-required': Joi.any(),
    'example-pattern': Joi.any(),
    'example-maxlength': Joi.any(),
    'example-email': Joi.any(),
    'example-url': Joi.any(),
    'example-number': Joi.any(),
    'example-numbermax': Joi.any(),
    'example-numbermin': Joi.any(),
    'example-custom': Joi.any()
}).oxor('example-email', 'example-url', 'example-custom');

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    },
    textField: {
        backgroundColor: brown[700],
        padding: '1rem'
    }
}));

const Form = (props) => {
    const constraintViolationReset = {
        'example-required': false,
        'example-pattern': false,
        'example-maxlength': false,
        'example-email': false,
        'example-url': false,
        'example-number': false,
        'example-numbermax': false,
        'example-numbermin': false,
        'example-custom': false
    };
    const otherReset = {
        'example-required': '',
        'example-pattern': '',
        'example-maxlength': '',
        'example-email': '',
        'example-url': '',
        'example-number': '',
        'example-numbermax': '',
        'example-numbermin': '',
        'example-custom': ''
    };
    const [constraintViolation, setConstraintViolation] = React.useState(constraintViolationReset);
    const [egg, setEgg] = React.useState(otherReset);
    const refExampleEmail = React.useRef()
    const refExampleUrl = React.useRef()
    const refExampleCustom = React.useRef();
    const refs = [refExampleEmail, refExampleUrl, refExampleCustom];
    const classes = useStyles();
    const objectToObject = (obj, fn) => Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    );
    const handleSubmit = (event) => {
        const form = event.target;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            props.onSubmitHandler && props.onSubmitHandler(egg);
        }
    };

    const applyJoiValidationConstraints = (newEgg) => {
        const eggMaybeConvertedForJoi = objectToObject(newEgg, (v) => v === '' ? undefined : v);
        const { error } = customConstraintOptionalExclusiveOr.validate(eggMaybeConvertedForJoi);
        const conststraintViolations = error && error.details[0].context.peers.reduce((current, item) => {
            current[item] = error ? error.message : false;
            return current;
        }, {});
        refs.forEach(ref => {
            ref.current.childNodes[1].childNodes[0].setCustomValidity(error ? error.message : '');
        })
        return conststraintViolations;
    }

    const handleChange = (event) => {
        event.target.setCustomValidity('');
        const newEgg = Object.assign({}, egg, { [event.target.name]: event.target.value });
        setEgg(newEgg);
        
        const isPassValidationConstraints = event.target.checkValidity();
        const joiConststraintViolations = applyJoiValidationConstraints(newEgg);

        setConstraintViolation(Object.assign(constraintViolationReset, { [event.target.name]: !isPassValidationConstraints }, joiConststraintViolations));
    }

    return (
        <form className={classes.root} onChange={handleChange}>
            <FormControl className={classes.textField} error={constraintViolation["example-required"]}>
                <TextField id={"example-required"} value={egg["example-required"]} name={"example-required"} label="Required" required error={constraintViolation["example-required"]} />
                <FormHelperText error={constraintViolation['example-required']}>{'required'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-pattern']} >
                <TextField id="example-pattern" value={egg["example-pattern"]} name="example-pattern" label="Pattern" InputProps={{ inputProps: { pattern: "\\$[a-z]" } }} error={constraintViolation["example-pattern"]} />
                <FormHelperText error={constraintViolation['example-pattern']}>{'pattern "$" followed by an alpha character'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-maxlength']} >
                <TextField id="example-maxlength" value={egg['example-maxlength']} name="example-maxlength" label="Max length" InputProps={{ inputProps: { maxLength: 6 } }} error={constraintViolation['example-maxlength']} />
                <FormHelperText error={constraintViolation['example-maxlength']}>{'max length 6'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-email']} >
                <TextField id="example-email" ref={refExampleEmail} value={egg["example-email"]} name="example-email" type="email" label="Email" error={constraintViolation['example-email']} />
                <FormHelperText error={constraintViolation['example-email']}>{'email'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-url']} >
                <TextField id="example-url" ref={refExampleUrl} value={egg["example-url"]} name="example-url" type="url" label="URL" error={constraintViolation['example-url']} />
                <FormHelperText error={constraintViolation['example-url']}>{'URL'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-number']} >
                <TextField id="example-number" value={egg['example-number']} name="example-number" type="number" label="Number" error={constraintViolation['example-number']} />
                <FormHelperText error={constraintViolation['example-number']}>{'Number'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-numbermax']} >
                <TextField id="example-numbermax" value={egg["example-numbermax"]} name="example-numbermax" type="number" label="Number max" InputProps={{ inputProps: { max: 10 } }} error={constraintViolation['example-numbermax']} />
                <FormHelperText error={constraintViolation['example-numbermax']}>{'Number max'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-numbermin']} >
                <TextField id="example-numbermin" value={egg["example-numbermin"]} name="example-numbermin" type="number" label="Number min" InputProps={{ inputProps: { min: 3 } }} error={constraintViolation['example-numbermin']} />
                <FormHelperText error={constraintViolation['example-numbermin']}>{'Number min'}</FormHelperText>
            </FormControl>
            <FormControl className={classes.textField} error={constraintViolation['example-custom']} >
                <TextField id="example-custom" ref={refExampleCustom} value={egg["example-custom"]} name="example-custom" label="Custom" error={constraintViolation['example-custom']} />
                <FormHelperText error={constraintViolation['example-custom']}>{`It's all very complicated ${constraintViolation['example-custom']}`}</FormHelperText>
            </FormControl>
            <Button color="primary"
                onSubmit={handleSubmit}
                title={"do native validation"}
                type="submit">Submit</Button>
        </form>
    )
}

Form.propTypes = {
    onSubmitHandler: PropTypes.func
}

export default Form
