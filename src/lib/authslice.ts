import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState: {
  userToken: null | string;
  userData: null | any;
  isLoading: boolean;
  isError: boolean | string;
} = {
  userToken: null,
  userData: null,
  isLoading: false,
  isError: false,
};

export let userLogin = createAsyncThunk(
  "authSlice/userLogin",
  async (formData: { email: string; password: string }) => {
    return await axios
      .post(`https://linked-posts.routemisr.com/users/signin`, formData)
      .then((res) => {
        // console.log(res.data.token);
        return res.data;
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        return err.response.data.error;
      });
  }
);

let authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {
    clearData: (state, action) => {
      state.userToken = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // console.log("fullfilld", action.payload.token);
      state.userToken = action.payload.token
      state.isLoading = false;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      console.log("pendeng", action);
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("rejected", action);
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});

export let authReducer = authSlice.reducer;
export let { clearData } = authSlice.actions;
