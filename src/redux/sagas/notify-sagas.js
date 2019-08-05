import {
    fork, put, take
} from "redux-saga/effects";

import { EXPORT_START, EXPORT_FINISH } from "../export-actions";
import { enqueueSnackbar, closeSnackbar } from "../notify-actions";

const AUTOHIDE_PERIOD = 2000;
const getNewKey = () => new Date().getTime() + Math.random();

function* notify(action) {
    yield console.log("notify");
    if (action.type === EXPORT_START) {
        yield put(enqueueSnackbar({
            message: "Export started.",
            options: {
                variant: "success",
                key: getNewKey(),
                autoHideDuration: AUTOHIDE_PERIOD,
                persist: true
            }
        }));
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