import React, { Component } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

class Partial extends Component {
    render() {
        const { id, children, isStatic } = this.props;

        if (!React.Children.count(children)) {
            return null;
        }

        const serverRender = isStatic ? renderToStaticMarkup : renderToString;
        const __html = serverRender(React.Children.only(children));

        return (
            <div dangerouslySetInnerHTML={{ __html }} {...{ id }} />
        );
    }
}

export default Partial;
