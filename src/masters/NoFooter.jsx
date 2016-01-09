import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Default from './Default';
import TopNav from './components/TopNav';
import Partial from './components/Partial';

class NoFooter extends Component {
    render() {
        const { components, ids, ...masterProps } = this.props;
        const { body: bodyComponent, ...masterComponents } = components;
        const { body: bodyId, ...masterIds } = ids;

        const html = {
            body: components.body && renderToStaticMarkup(components.body)
        };

        const props = {
            components: {
                body: (
                    <div>
                        <TopNav />
                        <Partial html={ html.body } id={ ids.body } />
                    </div>
                ),
                ...masterComponents
            },
            ids: {
                body: 'master-nofooter',
                ...masterIds
            },
            ...masterProps
        };

        return (
            <Default {...props} />
        );
    }
}

NoFooter.propTypes = {
    components: React.PropTypes.shape({
        body: React.PropTypes.node
    }),
    ids: React.PropTypes.shape({
        body: React.PropTypes.string,
        state: React.PropTypes.string
    }),
    clientSrc: React.PropTypes.string,
    state: React.PropTypes.object,
    title: React.PropTypes.string
};

export default NoFooter;
