import React from 'react';

export default React.createClass({
    propTypes: {
        to: React.PropTypes.string.isRequired
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