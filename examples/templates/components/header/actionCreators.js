import constants from './constants';

export default {
    signin: (username) => ({
        type: constants.SIGNIN,
        username
    }),
    signout: () => ({
        type: constants.SIGNOUT
    })
};
