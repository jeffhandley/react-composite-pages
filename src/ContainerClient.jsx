import PropTypes from 'prop-types';
import React from 'react';
import withSideEffect from 'react-side-effect';
import ReactCreateClass from 'create-react-class';

const _ = {
    uniq: require('lodash/uniq')
};

const ContainerClient = ReactCreateClass({
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
