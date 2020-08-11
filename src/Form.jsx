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
    const [error, setError] = React.useState(false);
    const [validated, setValidated] = React.useState(false);
    const classes = useStyles();
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    const handleChange = (event) => {
        console.log(event.target.name)
        // is valid
        setError(Object.assign(error, {[event.target.name]: true}))
        setValidated(false);
    }

    return (


        <form className={classes.root} validated={validated} onChange={handleChange}>  
            <FormControl className={classes.textField} error={error}>
                <TextField id={"example-required"} name={"example-required"} label="Required" required error={true}/>
                <FormHelperText error={true}>{'required'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-pattern" name="example-pattern" label="Pattern" InputProps={{ inputProps: { pattern: "$" } }}/>
                <FormHelperText>{'pattern include "$"'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-maxlength" name="example-maxlength" label="Max length" InputProps={{ inputProps: { maxlength: 6 } }}/>
                <FormHelperText>{'max length 6'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-email" name="example-email" type="email" label="Email"/>
                <FormHelperText>{'email'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-url" name="example-url" type="url" label="URL"/>
                <FormHelperText>{'URL'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-number" name="example-number" type="number" label="Number"/>
                <FormHelperText>{'Number'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-numbermax" name="example-numbermax" type="number" label="Number max" InputProps={{ inputProps: { max: 10 } }}/>
                <FormHelperText>{'Number max'}</FormHelperText>
            </FormControl>
            <FormControl  className={classes.textField} error={error} >
                <TextField id="example-numbermin" name="example-numbermin" type="number" label="Number min" InputProps={{ inputProps: { min: 3 } }}/>
                <FormHelperText>{'Number min'}</FormHelperText>
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
