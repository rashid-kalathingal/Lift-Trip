import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.clear()
            state.user = action.payload.user
            state.token = action.payload.token
        },
        register(state, action) {
            localStorage.clear()
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout(state) {
            state.user = null
            state.token = null
            localStorage.clear()
        },
        changeuserName(state,action){
            state.user.username = action.payload
        },
        changeuserEmail(state,action){
            state.user.email = action.payload
        },
        changeuserNumber(state,action){
            state.user.mobile = action.payload
        },
        changeuserDp(state,action){
            state.user.displayPic = [action.payload]
        }
    }
})

export const { register, login, logout ,changeuserName,changeuserDp,changeuserEmail,changeuserNumber} = authSlice.actions

export default authSlice.reducer


// variables and function that change the variables, and they are both available in the all components