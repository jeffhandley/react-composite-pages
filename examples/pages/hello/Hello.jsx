import PropTypes from 'prop-types';
import React from 'react';
import ReactCreateClass from 'create-react-class';

export default ReactCreateClass({
    propTypes: {
        to: PropTypes.string.isRequired
    },

    handleSignout(event) {
        event.preventDefault();

        window.Header.signout();
        this.forceUpdate();
    },

    render() {
        return (
            <span>
                Hello {this.props.to}.&nbsp;

                { typeof window !== 'undefined' && window.Header && window.Header.isSignedIn() && (
                    <a onClick={ this.handleSignout } href='#'>Sign out</a>
                ) }
            </span>
        );
    }
});