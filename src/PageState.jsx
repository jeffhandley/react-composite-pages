import PropTypes from 'prop-types';
import React from 'react';
import ReactCreateClass from 'create-react-class';

const _ = {
	isUndefined: require('lodash/isUndefined')
};

export default ReactCreateClass({
    displayName: 'PageState',

    propTypes: {
        id: PropTypes.string,
        state: PropTypes.object
    },

    getDefaultProps() {
        return {
            id: 'ContainerState'
        };
    },

    render() {
        const { id, state } = this.props;

        return !_.isUndefined(state) && (
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.${id} = ${JSON.stringify(state)};`
                }}
            />
        );
    }
});
