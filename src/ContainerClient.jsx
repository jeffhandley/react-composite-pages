import PropTypes from 'prop-types';
import React from 'react';
import withSideEffect from 'react-side-effect';

const _ = {
    uniq: require('lodash/uniq')
};

const ContainerClient = React.createClass({
    propTypes: {
        src: PropTypes.string.isRequired
    },

    render() {
        return false;
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
)(ContainerClient);
