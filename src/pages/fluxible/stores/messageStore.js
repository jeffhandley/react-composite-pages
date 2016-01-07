import { createStore } from 'fluxible/addons';
import { SET_TEXT } from '../constants';

export default createStore({
    storeName: 'Message',

    getMessage() {
        return this.text || 'No Message Specified';
    },

    handlers: {
        [SET_TEXT]: 'setText'
    },

    setText(text) {
        this.text = text;
        this.emitChange();
    },

    dehydrate() {
        return {
            text: this.text
        };
    },

    rehydrate(state) {
        this.text = state.text;
    }
});
