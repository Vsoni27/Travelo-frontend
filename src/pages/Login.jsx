import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import signup from "../images/signupbg.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "../store";
import { useDispatch } from "react-redux";
import {
  setrdkAuthenticated,
  setrdkloggedInUserData,
} from "../store/user/userSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await login({ email, password });
      console.log(response);

      if (response && response.data && response.data.user) {
        const rememberUser = response.data;
        localStorage.setItem("rememberUser", JSON.stringify(rememberUser));
        dispatch(setrdkAuthenticated(true));
        dispatch(setrdkloggedInUserData(response.data.user));
      } else {
        // Handle the case when the 'user' property is missing or response is invalid
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.log(error);
      dispatch(setrdkAuthenticated(false));
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${signup})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      p="80px"
      height={{ xs: "85vh", sm: "87vh" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "70%", sm: "30%" },
          borderRadius: "12px",
          padding: "50px",
          backgroundColor: "#ebebff85",
          marginTop: "-20px",
        }}
      >
        <Typography variant="h5" mb="25px" color="#4b4949">
          Login
        </Typography>

        <TextField
          fullWidth
          inputProps={{ ref: emailRef }}
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          name="email"
        />

        <TextField
          fullWidth
          inputProps={{ ref: passwordRef }}
          label="Password"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          name="password"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 24, display: "flex" }}
        >
          Submit{" "}
          {isLoading ? (
            <CircularProgress
              size={25}
              color="inherit"
              style={{ marginLeft: "15px" }}
            />
          ) : null}
        </Button>
        <Typography mt="25px">
          <Link to="/signup">Don't have an account?</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
