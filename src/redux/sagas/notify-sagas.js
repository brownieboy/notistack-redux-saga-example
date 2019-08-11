import React from "react";
import { fork, put, take } from "redux-saga/effects";

import { EXPORT_START, EXPORT_FINISH } from "../export-actions";
import { enqueueSnackbar, closeSnackbar } from "../notify-actions";
import NotifierCloseButton from "../../NotifierCloseButton";

const AUTOHIDE_PERIOD = 2000;

// Note for redux-saga to work, the key must be generated in the saga
// and then passed into the action creator.  If you let the action creator
// generate one, then it will fail trying to close snack programatically.
const getNewKey = () => new Date().getTime() + Math.random();

function* notify(action) {
  if (action.type === EXPORT_START) {
    const newKey = getNewKey();
    yield put(
      enqueueSnackbar({
        message: "Export started.",
        options: {
          variant: "success",
          key: newKey,
          autoHideDuration: AUTOHIDE_PERIOD,
          persist: true,
          // Action has to be a connected component in its own right, e.g
          // NotifierCloseButton.  We can't use regular Notistack syntax, e.g.:
          // <Button onClick={() => props.closeSnackbar(key)}>dismiss me</Button>
          // because we'd have to use put(closeSnackbar()), and put()
          // does not work inside of a callback.
          action: <NotifierCloseButton notifierKey={newKey} />
        }
      })
    );
  } else {
    yield put(closeSnackbar());
  }
}

export default function* notifySaga() {
  while (true) {
    const action = yield take([EXPORT_START, EXPORT_FINISH]);
    yield fork(notify, action);
  }
}
