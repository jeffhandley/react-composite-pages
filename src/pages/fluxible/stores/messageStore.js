import { createStore } from 'fluxible/addons';
import constants from '../constants';

export default createStore({
    storeName: 'Message',

    handlers: {
        [constants.SET_MESSAGE]: 'setMessage',
        [constants.SET_SOURCE]: 'setSource'
    },

    setMessage(message) {
        this.message = message;
        this.emitChange();
    },

    setSource(source) {
        this.source = source;
        this.emitChange();
    },

    dehydrate() {
        return {
            message: this.message,
            source: this.source
        };
    },

    rehydrate(state) {
        this.message = state.message;
        this.source = state.source;
    }
});
