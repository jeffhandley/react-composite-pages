import React, { Component } from 'react';

class Partial extends Component {
    render() {
        const __html = this.props.html;
        const { id } = this.props;

        return (
            <div dangerouslySetInnerHTML={{ __html, id }} />
        );
    }
}

export default Partial;
