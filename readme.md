# Notistack Redux Saga Example  

The example code here takes the Redux example from the [Notistack Repository](https://github.com/iamhosseindhv/notistack) and adapts it for use with Redux-Saga.

The idea is that the Saga can dispatch Notisstack action creators (`enqueueSnackbar()`, `closeSnackbar()` etc) in response to your existing Redux actions, rather than inserting new Notistack actions directly into your existing code.

## Example buttons

The example contains four buttons.

**Display Snackbar** and **Dismiss All Snackbars** are from the from the original Notistack sample code.  They directly dispatch the `enqueueSnackbar()` and `closeSnackbar()` action creators respectively.  Note: the latter will close _all_ open notifications when issued without parameters, as it is here.

**Start Export** and **Finish Export** are two new buttons, which dispatch two new action creators, `exportStart` and `exportFinish`.   The Saga in redux/sagas/notify-sagas.js listens for the two actions dispatched by those creators - `EXPORT_START` and `EXPORT_FINISH`.   When either of those actions is detected, the Saga will dispatch `enqueueSnackbar()` and `closeSnackbar()` action creators in response.