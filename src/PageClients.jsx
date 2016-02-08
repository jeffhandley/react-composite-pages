import React from 'react';

const _ = {
	isUndefined: require('lodash/isUndefined')
};

export default React.createClass({
    displayName: 'PageClients',

    propTypes: {
        clients: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    render() {
        const { clients } = this.props;

        if (!_.isUndefined(clients) && clients.length) {
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
