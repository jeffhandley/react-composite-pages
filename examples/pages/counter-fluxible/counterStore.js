import { createStore } from 'fluxible/addons';
import constants from './constants';

export default createStore({
    storeName: 'Counter',

    handlers: {
        [constants.SET_VALUE]: 'setValue',
        [constants.INCREMENT]: 'increment'
    },

    setValue(value = 0) {
        this.value = value;
        this.emitChange();
    },

    increment(count = 1) {
        this.value += count;
        this.emitChange();
    },

    dehydrate() {
        return {
            value: this.value
        };
    },

    rehydrate(state) {
        this.value = state.value;
    }
});
