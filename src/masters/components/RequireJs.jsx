import React, { Children, Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

const _ = {
    uniq: require('lodash/array/uniq')
};

class RequireJs extends Component {
    render() {
        if (this.props.children) {
            return Children.only(this.props.children);
        } else {
            return null;
        }
    }
}

RequireJs.propTypes = {
    src: PropTypes.string.isRequired
};

function reducePropsToState(propsList) {
    return _.uniq(propsList.map((props) => props.src));
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(RequireJs);
