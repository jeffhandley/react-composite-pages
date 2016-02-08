import React from 'react';

const _ = {
	isUndefined: require('lodash/isUndefined')
};

export default React.createClass({
    displayName: 'PageState',

    propTypes: {
        id: React.PropTypes.string,
        state: React.PropTypes.object
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
