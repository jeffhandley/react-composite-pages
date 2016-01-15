import React, { Children, Component } from 'react';
import withSideEffect from 'react-side-effect';

const RenderState = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        state: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.bool,
            React.PropTypes.number,
            React.PropTypes.object,
            React.PropTypes.string
        ]).isRequired
    },

    render() {
        return null;
    }
});

function reducePropsToState(propsList) {
    return propsList.reduce((reduced, state) => ({
        ...reduced,
        [state.id]: state.state
    }), { });
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(RenderState);
