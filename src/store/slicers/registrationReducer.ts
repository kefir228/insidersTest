import { createSlice } from "@reduxjs/toolkit";

interface RegistrationState {
    email:string
    password:string
    confirmPass:string
}

const initialState: RegistrationState = {
    email:'',
    password:'',
    confirmPass:''
}

const registrationSlice = createSlice({
    name:'registration',
    initialState,
    reducers:{

    }
})

export default registrationSlice.reducer