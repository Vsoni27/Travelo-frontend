import Avatar from "@mui/material/Avatar";
import { Box, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import SyncIcon from "@mui/icons-material/Sync";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import profileBackImage from "../../images/profilebackimage.jpg";
import Lottie from "lottie-react";
import circularLoading from "../../assets/circularLoading.json";

const FeedContent = () => {
  const [profileData, setProfileData] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [IsFollowing, setIsFollowing] = useState(false);
  const { searchedUserData } = useSelector((store) => store.user);
  const { loggedInuserData } = useSelector((store) => store.user);
  const [hoverText, setHoverText] = useState("Following");
  const [isFetching, setIsFetching] = useState(false);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log("searcheduser", searchedUserData);
  console.log("loggedinuserdatainfeedcontent", loggedInuserData);

  const loadUserProfileData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/api/users/profile/${searchedUserData.id}`,
        { withCredentials: true }
      );
      console.log("profileData", response);
      setProfileData(response.data);
      setShowProfile(true);
      setIsFollowing(response.data.profile.isFollowed);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/follows`,
        { to: `${searchedUserData.id}` },
        { withCredentials: true }
      );
      console.log(response);
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/follows/unfollow`,
        { to: `${searchedUserData.id}` },
        { withCredentials: true }
      );
      console.log(response);
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeChange = async (e) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/likes`,
        { postId: `${e.target.value}` },
        { withCredentials: true }
      );
      console.log(response);
      setProfileData((prevData) => {
        const updatedPosts = prevData.profile.posts.map((post) => {
          if (post._id === e.target.value) {
            return { ...post, liked: true, totalLikes: post.totalLikes + 1 };
          }
          return post;
        });
        return {
          ...prevData,
          profile: { ...prevData.profile, posts: updatedPosts },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikeChange = async (e) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/likes/unlike`,
        { postId: `${e.target.value}` },
        { withCredentials: true }
      );
      console.log(response);
      setProfileData((prevData) => {
        const updatedPosts = prevData.profile.posts.map((post) => {
          if (post._id === e.target.value) {
            return { ...post, liked: false, totalLikes: post.totalLikes - 1 };
          }
          return post;
        });
        return {
          ...prevData,
          profile: { ...prevData.profile, posts: updatedPosts },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("profileData", profileData);

  return (
    <Box flex={3} display="flex" alignItems="center" justifyContent="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt="50px"
        maxWidth="900px"
      >
        <Box>
          <Button
            onClick={() => {
              setIsFetching(true);
              setShowProfile(false);
              if (searchedUserData.length === 0) {
                // console.log("loading all post");
                // loadAllPost();
              } else {
                console.log("loading searched user post");
                loadUserProfileData();
              }
            }}
            cursor="pointer"
          >
            <SyncIcon fontSize="large" />
          </Button>
        </Box>

        {showProfile ? (
          <Box
            border="4px solid #49b8e3"
            height="100%"
            width={{ xs: "350px", sm: "850px" }}
            borderRadius="10px"
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              // border="2px solid black"
              height="400px"
              width="100%"
              borderRadius="10px"
            >
              <div
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  height: "50%",
                  backgroundImage: `url(${profileBackImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              />
              <Avatar
                sx={{
                  bgcolor: "orange",
                  height: "90px",
                  width: "90px",
                  marginLeft: "20px",
                  position: "relative",
                  bottom: "15%",
                }}
              >
                <h1>{profileData.profile.username[0].toUpperCase()}</h1>
              </Avatar>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bottom: "300px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: "0px",
                      color: "#437fb0",
                      marginBottom: "20px",
                    }}
                  >
                    {profileData.profile.username}
                  </h2>
                  <div
                    style={{
                      margin: "0",
                      color: "#437fb0",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      width: "250px",
                    }}
                  >
                    <CalendarMonthIcon sx={{ height: "20px" }} />
                    <h4
                      style={{
                        margin: "0",
                        marginLeft: "5px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Joined{" "}
                      {
                        month[
                          parseInt(
                            profileData.profile.createdAt.substring(6, 7)
                          ) - 1
                        ]
                      }{" "}
                      {profileData.profile.createdAt.substring(0, 4)}
                    </h4>
                  </div>
                  <div
                    style={{
                      margin: "0",
                      color: "#437fb0",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      width: "250px",
                    }}
                  >
                    <EmailIcon sx={{ height: "20px" }} />
                    <h4
                      style={{
                        margin: "0",
                        marginLeft: "5px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {profileData.profile.email}
                    </h4>
                  </div>
                </div>
                <div style={{ marginRight: "20px" }}>
                  {searchedUserData.id !== loggedInuserData.id ? (
                    IsFollowing ? (
                      <Button
                        variant="outlined"
                        sx={{ borderRadius: "20px" }}
                        onMouseEnter={() => setHoverText("Unfollow")}
                        onMouseLeave={() => setHoverText("Following")}
                        color={hoverText === "Unfollow" ? "error" : undefined}
                        // color = "error"
                        onClick={handleUnFollow}
                      >
                        <span style={{ fontWeight: "bold" }}>{hoverText}</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{ borderRadius: "20px" }}
                        onClick={handleFollow}
                      >
                        <span style={{ fontWeight: "bold" }}>Follow</span>
                      </Button>
                    )
                  ) : null}
                </div>
              </div>
            </Box>
          </Box>
        ) : isFetching ? (
          <div
            style={{
              marginTop: "190px",
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
        <div style={{ marginTop: "35px" }}>
          {showProfile &&
            profileData.profile.posts.map((data, index) => (
              <Posts
                data={data}
                index={index}
                handleLikeChange={handleLikeChange}
                handleUnlikeChange={handleUnlikeChange}
              />
            ))}
        </div>
      </Box>
    </Box>
  );
};

export default FeedContent;
