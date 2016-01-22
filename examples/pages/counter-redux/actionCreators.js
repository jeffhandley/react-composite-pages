import constants from './constants';

export default {
    increment: (count = 1) => ({
        type: constants.INCREMENT,
        count
    })
};
