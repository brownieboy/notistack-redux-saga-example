import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";

import { closeSnackbar } from "./redux/notify-actions";

const NotifierCloseButton = ({ notifierKey, closeSnackbar }) => (
  <Button
    onClick={() => {
      console.log("NotifierCloseButton for " + notifierKey);
      closeSnackbar(notifierKey);
    }}
  >
    Close me
  </Button>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeSnackbar
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(NotifierCloseButton);
