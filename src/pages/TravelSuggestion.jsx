import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import LocationCard from "../components/Card";
import Lottie from "lottie-react";
import circularLoading from "../assets/circularLoading.json";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const TravelSuggestion = () => {
  const [travelSuggestion, setTravelSuggestion] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const loadSuggestion = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/travel-suggestion`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setShowSuggestion(true);
      setTravelSuggestion(response.data);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
      // alert(error.response.data)
      if (error.response.data === "not enough likes") {
        setErrorMessage(true);
      }
    }
  };

  return (
    <Box mt="120px" display="flex" alignItems="center" justifyContent="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="100%"
        width={{ xs: "350px", sm: "950px" }}
      >
        <Button
          onClick={() => {
            setIsFetching(true);
            setShowSuggestion(false);
            loadSuggestion();
          }}
          cursor="pointer"
        >
          <SyncIcon fontSize="large" />
        </Button>
        {showSuggestion ? (
          travelSuggestion.map((value) => (
            <Box key={value.id}>
              <LocationCard
                name={value.name}
                location={value.location}
                description={value.description}
                price={value.price}
                coordinates={value.coordinates}
              />
            </Box>
          ))
        ) : isFetching ? (
          <div
            style={{
              marginTop: "230px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Lottie
              animationData={circularLoading}
              style={{ height: "100px" }}
            />
          </div>
        ) : null}
        {errorMessage && (
          <Box
            border="2px solid red"
            mt="50px"
            borderRadius="20px"
            p={2}
            bgcolor=" #ff00000f"
          >
            <h1 style={{ color: "red", display: "flex", alignItems: "center" }}>
              <ErrorOutlineIcon
                sx={{ color: "red", fontSize: "40px", mr: "5px" }}
              />{" "}
              Like Minimum 3 Post to get suggestions{" "}
              <ErrorOutlineIcon
                sx={{ color: "red", fontSize: "40px", ml: "5px" }}
              />
            </h1>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TravelSuggestion;

// "not enough likes"
