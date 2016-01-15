import React from 'react';
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

const reducers = (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return ++state;
    } else {
        return state;
    }
}

const actionCreators = {
    increment: () => ({ type: 'INCREMENT' })
};

const mapStateToProps = (state) => ({
    value: state
});

export default function createCounter(value) {
    const store = createStore(reducers, value);
    const actions = bindActionCreators(actionCreators, store.dispatch);

    const Counter = (props) => (
        <div>
            Counter Value: { props.value }
            <div>
                <button onClick={actions.increment}>
                    Increment
                </button>
            </div>
        </div>
    );

    const Connected = connect(mapStateToProps, actionCreators)(Counter);
    const Component = () => (
        <Provider store={store}>
            <Connected />
        </Provider>
    );

    return {
        Component,
        actions,
        getState: store.getState
    };
}
