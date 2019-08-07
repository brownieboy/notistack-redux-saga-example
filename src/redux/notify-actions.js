export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const enqueueSnackbar = notification => {
    const key = notification.options && notification.options.key;

    // Note for redux-saga to work, the key must be generated in the saga
    // and then passed into this action creator.  If you don't pass one in
    // and let the action create generated, then it will fail.
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => {
    console.log("closeSnackbar action, key: ", key);
    return {
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
}};

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});
