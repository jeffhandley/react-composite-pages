import React, { Children, Component } from 'react';
import withSideEffect from 'react-side-effect';

const Title = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render() {
        if (this.props.children) {
            return Children.only(this.props.children);
        } else {
            return null;
        }
    }
});

function reducePropsToState(propsList) {
    const innermostProps = propsList[propsList.length - 1];

    if (innermostProps) {
        return innermostProps.title;
    }
}

function handleStateChangeOnClient(title) {
    document.title = title || '';
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(Title);
