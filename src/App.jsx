import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthLoader from "./components/AuthLoader";
import { Signup, Login, Form, Error404, Profile, Social, TravelSuggestion } from "./pages";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setrdkAuthenticated, setrdkloggedInUserData } from "./store/user/userSlice";

function App() {

  const {isAuthenticated, loggedInuserData} = useSelector((store)=>store.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const userDataFromLocalStorage = localStorage.getItem("rememberUser");
    if(userDataFromLocalStorage){
      // console.log(JSON.parse(userDataFromLocalStorage))
      const localData = JSON.parse(userDataFromLocalStorage);
      console.log("userDataFromLocalStorage",JSON.parse(userDataFromLocalStorage));
      dispatch(setrdkAuthenticated(true));
      dispatch(setrdkloggedInUserData(localData.user));
      console.log("loggedInUserinLocal",localData.user);
      // console.log("loggedinuser", loggedInuserData);
    }else{
      dispatch(setrdkAuthenticated(false));
    }
  },[])

  return (
    <div className="App" style = {{height: "100vh"}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
              />
            }
          >
            <Route index element={<Form />} />
            <Route path="/signup" element={<Signup />} />
            {isAuthenticated ? (
              <Route
                path="/Social"
                element={
                  <Social
                    loggedInuserData={loggedInuserData}
                  />
                }
              />
            ) : (
              <Route index element={<Form />} />
            )}
            <Route
              path="/login"
              element={
                <Login
                />
              }
            />
            <Route path = "/Profile" element = {<Profile />}/>
            <Route path = "/TravelSuggestion" element = {<TravelSuggestion />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//
export default App;
//
