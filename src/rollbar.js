import Rollbar from 'rollbar';

const _rollbar = new Rollbar({
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    enabled: (process.env.NODE_ENV !== 'development'),
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV,
    }
});

function warning(message, err, custom, callback) {
    _rollbar.warn(message, err, custom, callback);
}

export {
    warning,
};
