import React from "react";
import {
    fork, put, take, call
} from "redux-saga/effects";

import { EXPORT_START, EXPORT_FINISH } from "../export-actions";
import { enqueueSnackbar, closeSnackbar } from "../notify-actions";

const AUTOHIDE_PERIOD = 2000;
const getNewKey = () => new Date().getTime() + Math.random();

// See https://github.com/redux-saga/redux-saga/issues/79#issuecomment-180807127
// function bindCallbackToPromise() {
//     console.log("bindCallbackToPromise()");
//     let _resolve
//     const promise = () => {
//         return new Promise((resolve) => {
//             console.log("bindCallbackToPromise resolved");
//             _resolve = resolve
//         })
//     }
//     const cb = (args) => _resolve(args)

//     return {
//         promise
//         , cb
//     }
// }


function* notify(action) {
    yield console.log("notify");

    // const closeDialog = bindCallbackToPromise();

    if (action.type === EXPORT_START) {
        yield put(enqueueSnackbar({
            message: "Export started.",
            options: {
                variant: "success",
                key: getNewKey(),
                autoHideDuration: AUTOHIDE_PERIOD,
                persist: true,
                action: key => (
                    <button onClick={() => {
                        // not working as a simple put, because Notistack will have to run it,
                        // and Notistack doesn't know what put is!!
                        // console.log("button onClick promise bound");
                        put(closeSnackbar(key));
                        // call(closeDialog.promise);
                    }}>Close</button>
                )
            }
        }));
        // const takeVar = yield take({
        //     closeDialog: call(closeDialog.promise)
        // })
    }
    else {
        yield (put(closeSnackbar()));
    }
}

export default function* notifySaga() {
    while (true) {
        const action = yield take([EXPORT_START, EXPORT_FINISH]);

        // if (!action.payload.content) {
        //     continue;
        // }

        yield fork(notify, action);
    }
}