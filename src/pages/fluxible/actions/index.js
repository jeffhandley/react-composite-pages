import { SET_TEXT } from '../constants';

export function load(actionContext, payload, done) {
    actionContext.dispatch(SET_TEXT, payload.text);
    done();
}

export function setMessage(actionContext, message, done) {
    actionContext.dispatch(SET_TEXT, message);
    done();
}
