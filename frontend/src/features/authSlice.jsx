import { createSlice,current ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../services/authService";
const API_URL = "http://localhost:8080/user/";

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({ email, password} , thunkAPI) => {
      try {
        console.log(email)
        console.log(password)
        console.log("step 1 ")
        const response =await   authService.login({email,password})
        console.log(response.data)
       if (response.data) {
        localStorage.setItem("user", response.data)
        axios.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`; //fi kol request tab3iith lheader maah
       }
    return response.data
      } catch (error) {
        console.log("Error", error.response.data)
        return thunkAPI.rejectWithValue(error.response.data)      }
    }
  );

  export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async ({ name,email, password} , thunkAPI) => {
      try {
        
        const response =await  authService.register({ name,email,password})
        console.log(response.data)
       if (response.data) {
        localStorage.setItem("user", response.data)
        axios.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`; //fi kol request tab3iith lheader maah
       }
       console.log("userAdded")
    return response.data
      } catch (error) {
        console.log(error)
        console.log("Error", error.response.data)
        return thunkAPI.rejectWithValue(error.response.data)      }
    }
  );

const authSlice= createSlice({
name: 'auth',
initialState:{
    isLoggedIn:false,
    isRegistred:false,

    user:null
},
extraReducers:{
   
    [userLogin.fulfilled]: (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      },
      [userLogin.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
      [userRegister.fulfilled]: (state, action) => {
        state.isRegistred = true;
        state.user = action.payload;

      },
      [userRegister.rejected]: (state, action) => {
        state.isRegistred = false;
        state.user = null;
      },
}
})




const { reducer } = authSlice;
export default reducer;