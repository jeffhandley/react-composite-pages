import React from 'react';
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

const reducers = (state, action) => {
    if (action.type === 'UPDATE_DATE') {
        return new Date().toString();
    } else {
        return state;
    }
}

const actionCreators = {
    updateDate: () => ({ type: 'UPDATE_DATE' })
};

const mapStateToProps = (state) => ({
    date: state
});

export default function createFooter(date) {
    const store = createStore(reducers, date);
    const actions = bindActionCreators(actionCreators, store.dispatch);

    const Counter = (props) => (
        <div>
            Last Update: { props.date }
            <div>
                <button onClick={actions.updateDate}>
                    Update
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
