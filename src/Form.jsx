import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

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

const Form = props => {
    const [error, setError] = React.useState({});
    const [validated, setValidated] = React.useState(false);
    const classes = useStyles();
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const isPassFormValidationConstraints = form.checkValidity();
        if ( isPassFormValidationConstraints === false) {
          console.log('invalid form')
          event.preventDefault();
          event.stopPropagation();
        }
        // TODO: in real world do submit
        setValidated(isPassFormValidationConstraints);
      };
    const handleChange = (event) => {
        setValidated(false);
        const isPassValidationConstraints = event.target.checkValidity();
        setError(Object.assign(error, {[event.target.name]: !isPassValidationConstraints}))
        setValidated(!isPassValidationConstraints);
    }

    return (
        <form className={classes.root} validated={validated} onChange={handleChange}>  
            <FormControl className={classes.textField} error={error["example-required"]}>
                <TextField id={"example-required"} name={"example-required"} label="Required" required error={error["example-required"]}/>
                <FormHelperText error={error['example-required']}>{'required'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-pattern']} >
                <TextField id="example-pattern" name="example-pattern" label="Pattern" InputProps={{ inputProps: { pattern: "$" } }} error={error["example-pattern"]}/>
                <FormHelperText error={error['example-pattern']}>{'pattern include "$"'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-maxlength']} >
                <TextField id="example-maxlength" name="example-maxlength" label="Max length" InputProps={{ inputProps: { maxLength: 6 } }} error={error['example-maxlength']}/>
                <FormHelperText error={error['example-maxlength']}>{'max length 6'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-email']} >
                <TextField id="example-email" name="example-email" type="email" label="Email" error={error['example-email']}/>
                <FormHelperText error={error['example-email']}>{'email'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-url']} >
                <TextField id="example-url" name="example-url" type="url" label="URL" error={error['example-url']}/>
                <FormHelperText error={error['example-url']}>{'URL'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-number']} >
                <TextField id="example-number" name="example-number" type="number" label="Number" error={error['example-number']}/>
                <FormHelperText error={error['example-number']}>{'Number'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-numbermax']} >
                <TextField id="example-numbermax" name="example-numbermax" type="number" label="Number max" InputProps={{ inputProps: { max: 10 } }} error={error['example-numbermax']}/>
                <FormHelperText error={error['example-numbermax']}>{'Number max'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error['example-numbermin']} >
                <TextField id="example-numbermin" name="example-numbermin" type="number" label="Number min" InputProps={{ inputProps: { min: 3 } }} error={error['example-numbermin']}/>
                <FormHelperText error={error['example-numbermin']}>{'Number min'}</FormHelperText>
            </FormControl>
            
            <Button color="primary"
                onClick={handleSubmit}
                title={"do native validation"}
                type="submit">Submit</Button>
            <Button color="secondary" title={"no reason for this whatever"}>Scramble</Button>
        </form>
    )
}

Form.propTypes = {

}

export default Form
