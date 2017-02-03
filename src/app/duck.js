import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { getFingerPrint } from '../services/fingerprint'
import { logoutUser, getCurrentUser, getWorksheets, getCompleteWorksheet } from '../services/firebase'
import { push } from 'react-router-redux'

const UPDATE_ERROR = "old_wood/app/UPDATE::ERROR"
const UPDATE_SUCCESS = "old_wood/app/UPDATE::SUCCESS"
const UPDATE_USER = "old_wood/app/UPDATE::USER"
const UPDATE_FINGERPRINT = "old_wood/app/UPDATE::FINGERPRINT"
const UPDATE_LOADING = "old_wood/app/UPDATE::LOADING"
const UPDATE_WORKSHEETS = "old_wood/app/UPDATE::WORKSHEETS"
const UPDATE_WORKSHEET = "old_wood/app/UPDATE::WORKSHEET"

const INITIAL_STATE = Map({
    loading: true,
    user: null
})

export const updateError = createAction(UPDATE_ERROR)
export const updateSuccess = createAction(UPDATE_SUCCESS)
export const updateUser = createAction(UPDATE_USER)
export const updateFingerprint = createAction(UPDATE_FINGERPRINT)
export const updateLoading = createAction(UPDATE_LOADING)
export const updateWorksheets = createAction(UPDATE_WORKSHEETS)
export const updateWorksheet = createAction(UPDATE_WORKSHEET)

export const logout = () => (dispatch) => {
    logoutUser()
    .then(() => {
        dispatch(updateUser(null))
        dispatch(push('/logout'))
    })
    .catch(err => dispatch(updateError(err)))
}

export const fetchFingerprint = () => (dispatch) => {
    getFingerPrint()
    .then(result => dispatch(updateFingerprint(result)))
}

export const fetchUser = () => (dispatch) => {
    getCurrentUser()
    .then(u => dispatch(updateUser(u)))
}

export const fetchWorksheet = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getCompleteWorksheet(id)
    .then(response => {
        dispatch(updateWorksheet(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(updateError(err))
        dispatch(updateLoading(false))
    })
}

export const fetchWorksheets = () => (dispatch) => {
    dispatch(updateLoading(true))
    
    getWorksheets()
    .then(response => {
        dispatch(updateWorksheets(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(updateError(err))
        dispatch(updateLoading(false))
    })
}

export default handleActions({
    [UPDATE_ERROR]: (state, action) => (state.withMutations(ctx => {
        ctx.set("error", action.error).set("errorMsg", action.payload.message)
    })),
    [UPDATE_SUCCESS]: (state, action) => (state.withMutations(ctx => { 
        ctx.set("error", false).set("errorMsg", action.payload) 
    })),
    [UPDATE_USER]: (state, action) => state.set("user", action.payload),
    [UPDATE_FINGERPRINT]: (state, action) => state.set("fingerprint", action.payload),
    [UPDATE_LOADING]: (state, action) => state.set("loading", action.payload),
    [UPDATE_WORKSHEETS]: (state, action) => state.set("worksheets", action.payload),
    [UPDATE_WORKSHEET]: (state, action) => state.set("worksheet", action.payload)
}, INITIAL_STATE)
