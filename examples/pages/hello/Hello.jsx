import React from 'react';

export default React.createClass({
    propTypes: {
        to: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <span>Hello {this.props.to}</span>
        );
    }
});