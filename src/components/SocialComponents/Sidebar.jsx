import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box position="fixed" width="14vw" mr="0px">
      <List sx={{ cursor: "pointer" }}>
        <Link
          to="/"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography fontWeight="bold" color="#757f83">
                  HomePage
                </Typography>
              }
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
        </Link>

        <Link
          to="/TravelSuggestion"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <ListItem>
            <ListItemIcon>
              <TravelExploreIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography fontWeight="bold" color="#757f83">
                  Travel Suggestion
                </Typography>
              }
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
        </Link>
        <Link
          to="/Profile"
          style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
        >
          <ListItem>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography fontWeight="bold" color="#757f83">
                  Profile
                </Typography>
              }
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
