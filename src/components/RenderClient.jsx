import React, { Children, Component } from 'react';
import withSideEffect from 'react-side-effect';

const _ = {
    uniq: require('lodash/array/uniq')
};

const RenderClient = React.createClass({
    propTypes: {
        src: React.PropTypes.string.isRequired
    },

    render() {
        return null;
    }
});

function reducePropsToState(propsList) {
    return _.uniq(propsList.map((props) => props.src));
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(RenderClient);
