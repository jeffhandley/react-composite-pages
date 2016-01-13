import React, { Children, Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

class Master extends Component {
    render() {
        if (this.props.children) {
            return Children.only(this.props.children);
        } else {
            return null;
        }
    }
}

Master.propTypes = {
    type: PropTypes.func.isRequired
};

function reducePropsToState(propsList) {
    const innermostProps = propsList[propsList.length - 1];

    if (innermostProps) {
        return innermostProps.type;
    }
}

function handleStateChangeOnClient() { }

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(Master);
