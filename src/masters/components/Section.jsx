import React, { Children, Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withSideEffect from 'react-side-effect';

class Section extends Component {
    render() {
        if (this.props.children) {
            return Children.only(this.props.children);
        } else {
            return null;
        }
    }
}

Section.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    static: PropTypes.bool
};

function reducePropsToState(propsList) {
    return propsList.reduce((parent, child) => {
        const { name: sectionName, ...childProps } = child;

        return {
            ...parent,
            [sectionName]: childProps
        };
    }, { });
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(Section);
