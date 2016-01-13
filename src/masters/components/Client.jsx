import React, { Children, Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

class Client extends Component {
    render() {
        if (this.props.children) {
            return Children.only(this.props.children);
        } else {
            return null;
        }
    }
}

Client.propTypes = {
    src: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    id: PropTypes.string
};

function reducePropsToState(propsList) {
    return propsList;
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(Client);
