import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { useLogoutMutation } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  setrdkAuthenticated,
  setrdkloggedInUserData,
  setrdksearchUserData,
} from "../store/user/userSlice";

const Navbar = () => {
  const [anchorE1, setAnchorE1] = useState(null);
  const [logout, { isLoading }] = useLogoutMutation();
  const { isAuthenticated } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const [searchTerm, setsearchTerm] = useState("");
  const [options, setoptions] = useState([]);
  // console.log(searchTerm);

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/api/users?where[username][like]=${searchTerm}`,
        { withCredentials: true }
      );
      const userData = response.data.docs;
      // console.log(userData)
      setoptions(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (event, value) => {
    if (value) {
      // setsearchedUserData(value);
      dispatch(setrdksearchUserData(value));
    }
  };

  const handlelogout = async () => {
    try {
      logout();
      dispatch(setrdkAuthenticated(false));
      dispatch(setrdkloggedInUserData([]));
      localStorage.removeItem("rememberUser");
      alert("Logout successfully");
    } catch (error) {
      console.error(error);
    }
    setAnchorE1(null);
  };

  return (
    <>
      <nav>
        <AppBar position="fixed" sx={{ backgroundColor: "#49b8e3de" }}>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                display={{ xs: "none", sm: "block" }}
                mr="10px"
              >
                Travelo
              </Typography>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: 20,
                  marginLeft: "10px",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                Home
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/Social"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: 20,
                      marginLeft: "20px",
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                  >
                    Social
                  </Link>
                  <Autocomplete
                    freeSolo
                    options={options}
                    getOptionLabel={(option) => option.username}
                    onChange={handleOnChange}
                    renderInput={(params) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "200px",
                          "@media (min-width: 768px)": {
                            width: "300px",
                          },
                        }}
                      >
                        {" "}
                        <TextField
                          {...params}
                          label="Search for username"
                          variant="outlined"
                          size="small"
                          value={searchTerm}
                          onChange={(event) =>
                            setsearchTerm(event.target.value)
                          }
                          InputProps={{
                            ...params.InputProps,
                          }}
                          sx={{ marginLeft: "20px" }}
                        />
                        <Button variant="outlined" onClick={handleSearchClick}>
                          <SearchIcon />
                        </Button>
                      </Box>
                    )}
                  />
                </>
              ) : null}
            </div>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorE1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorE1)}
                onClose={handleClose}
              >
                {isAuthenticated
                  ? [
                      <MenuItem key="logout" onClick={handlelogout}>
                        <Link
                          to="/"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: 20,
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <LogoutIcon /> Logout
                        </Link>
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem key="signup" onClick={handleClose}>
                        <Link
                          to="/signup"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: 20,
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <PersonAddAlt1Icon /> Signup
                        </Link>
                      </MenuItem>,
                      <MenuItem key="login" onClick={handleClose}>
                        <Link
                          to="/Login"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: 20,
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                        >
                          <LoginIcon /> Login
                        </Link>
                      </MenuItem>,
                    ]}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
