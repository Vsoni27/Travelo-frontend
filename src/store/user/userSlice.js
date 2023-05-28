import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loggedInuserData: [],
    searchedUserData: [],
  }, 
  reducers: {
    setrdkAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      //   console.log("rdkauthenticated ", state.isAuthenticated);
    },
    setrdkloggedInUserData: (state, action) => {
      state.loggedInuserData = action.payload;
        console.log("rdkuserdata", state.loggedInuserData);
    },
    setrdksearchUserData: (state, action) => {
      state.searchedUserData = action.payload;
      console.log("rdksearchuser", state.searchedUserData);
    },
  },
});

export const {
  setrdkAuthenticated,
  setrdkloggedInUserData,
  setrdksearchUserData,
} = userSlice.actions;
export default userSlice.reducer;
