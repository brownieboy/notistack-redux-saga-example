import {
    fork, put, take
} from "redux-saga/effects";

import { EXPORT_START } from "../export-actions";

function* notify() {
    yield console.log("notify");
}

export default function* notifySaga() {
    while (true) {
        const action = yield take([EXPORT_START]);

        // if (!action.payload.content) {
        //     continue;
        // }

        yield fork(notify, action);
    }
}