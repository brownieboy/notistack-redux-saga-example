import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Notifier from './Notifier';
import { enqueueSnackbar, closeSnackbar } from './redux/notify-actions';
import { exportStart } from './redux/export-actions';

const App = (props) => {
    const handleClick = () => {

        // NOTE:
        // if you want to be able to dispatch a `closeSnackbar` action later on, 
        // you SHOULD pass your own `key` in the options. `key` can be any sequence
        // of number or characters, but it has to be unique to a given snackbar. 
        props.enqueueSnackbar({
            message: 'Failed fetching data.',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'warning',
                action: key => (
                    <Button onClick={() => props.closeSnackbar(key)}>dissmiss me</Button>
                ),
            },
        });
    };

    const handleDimissAll = () => {
        props.closeSnackbar();
    };

    const handleStartExport = () => {
        props.exportStart();
    };

    return (
        <Fragment>
            <Notifier />
            <Typography variant="h4" gutterBottom>Notistack redux example</Typography>

            <Button variant="contained" onClick={handleClick}>Display snackbar</Button>
            <Button variant="contained" onClick={handleDimissAll}>Dismiss all snackbars</Button>
            <Button variant="contained" onClick={handleStartExport}>Start export</Button>
        </Fragment>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    exportStart
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
