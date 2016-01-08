import React from 'react';

export default (props) => (
    <div>
        <div id={props.id || 'page-content'}>
            { props.children }
        </div>
        <script dangerouslySetInnerHTML={{__html: props.pageState }} />
        { props.clientSrc && <script src={props.clientSrc} /> }
    </div>
);
