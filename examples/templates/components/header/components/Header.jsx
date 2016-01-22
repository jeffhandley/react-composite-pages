import React from 'react';

export default React.createClass({
    propTypes: {
        signin: React.PropTypes.func.isRequired,
        signout: React.PropTypes.func.isRequired,
        username: React.PropTypes.string
    },

    handleSignin() {
        this.props.signin('user');
    },

    handleSignout() {
        this.props.signout();
    },

    render() {
        const { username } = this.props;

        return (
            <div style={{ height: 50, backgroundColor: '#343434', color: 'white' }}>
                { username ? (
                    <div>
                        Welcome, { username }!&nbsp;
                        <button onClick={ this.handleSignout }>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button onClick={ this.handleSignin }>
                        Sign In
                    </button>
                ) }
            </div>
        );
    }
});
