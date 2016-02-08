import React from 'react';
import withSideEffect from 'react-side-effect';

const _ = {
    uniq: require('lodash/uniq')
};

const RenderClient = React.createClass({
    propTypes: {
        src: React.PropTypes.string.isRequired
    },

    render() {
        return false;
    }
});

function reducePropsToState(propsList) {
    return _.uniq(propsList.map((props) => props.src));
}

function handleStateChangeOnClient() {
}

const RenderClientWithSideEffect = withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(RenderClient);

RenderClientWithSideEffect.Script = React.createClass({
    displayName: 'RenderClient',

    propTypes: {
        clients: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    render() {
        const { clients } = this.props;

        if (clients && clients.length) {
            if (clients.length === 1) {
                return <script src={clients[0]} />
            } else {
                return (
                    <div>
                    {
                        clients.map((client) => (
                            <script key={client} src={client} />
                        ))
                    }
                    </div>
                );
            }
        } else {
            return false;
        }
    }
});

export default RenderClientWithSideEffect;
