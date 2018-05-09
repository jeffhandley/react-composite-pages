import PropTypes from 'prop-types';
import React from 'react';
import ReactCreateClass from 'create-react-class';

const _ = {
	isUndefined: require('lodash/isUndefined')
};

export default ReactCreateClass({
    displayName: 'PageClients',

    propTypes: {
        clients: PropTypes.arrayOf(PropTypes.string)
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
