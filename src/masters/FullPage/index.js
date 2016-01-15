import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderState from '../../components/RenderState';
import RenderClient from '../../components/RenderClient';
import loadMaster from '../Default';
import loadTopNav from '../../components/TopNav';
import loadFooter from '../../components/Footer/server';

export default function renderMaster(req, callback) {
    setTimeout(() => {
        loadTopNav('Jeff', (TopNav, topNavActions) => {
            loadFooter(null, (Footer, footerActions) => {
                loadMaster(req, (Master, masterActions) => {
                    const Default = React.createClass({
                        propTypes: {
                            body: React.PropTypes.element
                        },

                        render() {
                            const topNav = ReactDOMServer.renderToStaticMarkup(<TopNav />);
                            const body = ReactDOMServer.renderToStaticMarkup(this.props.body);
                            const footer = ReactDOMServer.renderToStaticMarkup(
                                <Footer id='app-footer' clientSrc='/nui/client/masters/fullpage.js' />
                            );

                            const state = RenderState.rewind();
                            const clients = RenderClient.rewind();

                            return (
                                <Master
                                    body={
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: topNav }} />
                                            <div dangerouslySetInnerHTML={{ __html: body }} />
                                            <div dangerouslySetInnerHTML={{ __html: footer }} />
                                            { state && <script dangerouslySetInnerHTML={{ __html: `
                                                window.RenderState = ${JSON.stringify(state)};
                                            ` }} /> }
                                            { clients && clients.map((client) => (
                                                <script key={client} src={client} />
                                            ))}
                                        </div>
                                    }
                                />
                            );
                        }
                    });

                    callback(
                        Default,
                        {
                            ...masterActions,
                            ...footerActions,
                            ...topNavActions
                        }
                    );
                });
            });
        })
    }, 100);
}

