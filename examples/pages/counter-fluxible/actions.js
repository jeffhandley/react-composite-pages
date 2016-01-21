import constants from './constants';

export function setValue(actionContext, { value }, done) {
    actionContext.dispatch(constants.SET_VALUE, value);
    done();
}

export function increment(actionContext, { count }, done) {
    actionContext.dispatch(constants.INCREMENT, count);
    done();
}