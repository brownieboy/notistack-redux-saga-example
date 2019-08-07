import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSnackbar } from "./redux/notify-actions";



const NotifierCloseButton = ({ notifierKey, closeSnackbar }) => {
    return <button onClick={() => {
            console.log("NotifierCloseButton for " + notifierKey);
            closeSnackbar(notifierKey);
        }}>Close me</button>;
}


const mapDispatchToProps = dispatch => bindActionCreators({
    closeSnackbar
}, dispatch);

export default connect(null, mapDispatchToProps)(NotifierCloseButton);
// export default NotifierCloseButton;