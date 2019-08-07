import React from "react";
import {
    fork, put, take, call, race
} from "redux-saga/effects";

import { EXPORT_START, EXPORT_FINISH } from "../export-actions";
import { enqueueSnackbar, closeSnackbar } from "../notify-actions";
import NotifierCloseButton from "../../NotifierCloseButton";

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

// https://stackoverflow.com/questions/43613403/using-put-in-callback
// function exportStartedSnackbar(newKey) {
//     console.log("exportStartedSnackbar, outside promise");
//     return new Promise((resolve, reject) => {
//         console.log("exportStartedSnackbar, inside promise");
//         put(enqueueSnackbar({
//             message: "Export started.",
//             options: {
//                 variant: "success",
//                 key: newKey,
//                 autoHideDuration: AUTOHIDE_PERIOD,
//                 persist: true,
//                 action: key => (
//                     <button onClick={() => resolve('confirmed')}>Close</button>
//                 )
//             }
//         }));
//     });
// }

function exportStartedSnackbar(newKey) {
    console.log("exportStartedSnackbar, outside promise");
    return new Promise((resolve, reject) => {
        console.log("exportStartedSnackbar, inside promise");
    });
}


function* notify(action) {
    yield console.log("notify");
    // const cancel = bindCallbackToPromise();
    // const confirm = bindCallbackToPromise();

    // const closeDialog = bindCallbackToPromise();

    if (action.type === EXPORT_START) {
        console.log("Got EXPORT_START");
        const newKey = getNewKey();
        yield put(enqueueSnackbar({
            message: "Export started.",
            options: {
                variant: "success",
                key: newKey,
                autoHideDuration: AUTOHIDE_PERIOD,
                persist: true,
                action: <NotifierCloseButton notifierKey={newKey} />
            }
        }));
        // const closeIt = yield call(exportStartedSnackbar);
        // const myRace = yield race({
        //     cancel: call(cancel.promise)
        //     , confirm: call(confirm.promise)
        // })
        // console.log("closeIt: ");

        // yield put(closeSnackbar(newKey));
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