import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderState from '../../components/RenderState';
import RenderClient from '../../components/RenderClient';
import Title from '../../components/Title';
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
                            const body = ReactDOMServer.renderToStaticMarkup(this.props.body);

                            const state = RenderState.rewind();
                            const clients = RenderClient.rewind();
                            const title = Title.rewind();

                            return (
                                <Master
                                    body={
                                        <div>
                                            <TopNav />
                                            <div dangerouslySetInnerHTML={{ __html: body }} />
                                            { state && <script dangerouslySetInnerHTML={{ __html: `
                                                window.RenderState = ${JSON.stringify(state)};
                                            ` }} /> }
                                            { clients && clients.map((client) => (
                                                <script key={client} src={client} />
                                            ))}
                                            <Footer id='app-footer' clientSrc='/nui/client/masters/fullpage.js' />
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

