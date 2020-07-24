import {brown, purple, lime } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: purple[50],
        },
        secondary: {
            main: lime.A400,
        },
        action: {
            active: 'rgba(brown[900], 0.54)',
            disabled: 'rgba(brown[900], 0.3)',
            hover: 'rgba(brown[900], 0.08)',
            selected: 'rgba(brown[900], 0.16)',
            disabledBackground: 'rgba(brown[900], 0.12)',
        },
        background: {
            paper: brown[800],
            default: brown[900],
        },
        divider: 'rgba(brown[900], 0.12)',
        text: {
            primary: purple[50],
            secondary: purple.A100,
            disabled: purple.A200,
            hint: purple.A200,
        }
    }
})
darkTheme = responsiveFontSizes(darkTheme);
export default darkTheme;