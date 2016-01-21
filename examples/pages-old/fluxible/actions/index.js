import constants from '../constants';

export function setMessage(actionContext, message, done) {
    actionContext.dispatch(constants.SET_MESSAGE, message);
    done();
}

export function setSource(actionContext, source, done) {
    actionContext.dispatch(constants.SET_SOURCE, source);
    done();
}