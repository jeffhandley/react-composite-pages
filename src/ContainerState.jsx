import PropTypes from 'prop-types';
import React from 'react';
import withSideEffect from 'react-side-effect';

const _ = {
    isUndefined: require('lodash/isUndefined')
};

const ContainerState = React.createClass({
    propTypes: {
        id: PropTypes.string.isRequired,
        state: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.bool,
            PropTypes.number,
            PropTypes.object,
            PropTypes.string
        ])
    },

    render() {
        return false;
    }
});

function reducePropsToState(propsList) {
    return propsList.reduce((reduced, state) => {
        if (!_.isUndefined(state) && state.id) {
            return {
                ...reduced,
                [state.id]: state.state
            };
        } else {
            return reduced;
        }
    }, { });
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(ContainerState);
