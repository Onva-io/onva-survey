import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff4d56',
        },
        secondary: {
            main: '#ffe4e0',
        },
        error: {
            main: '#ff4444',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
