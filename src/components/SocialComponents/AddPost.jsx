import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
  Input,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const AddPost = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loggedInuserData } = useSelector((store) => store.user);
  console.log("here", loggedInuserData);

  const [caption, setcaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCaptionChange = (event) => {
    setcaption(event.target.value);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("caption", caption);
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/posts",
        formData,
        { withCredentials: true }
      );
      console.log(response);
      setSelectedFile(null);
      setcaption("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <IconButton onClick={handleOpen}>
            <AddIcon sx={{ color: "white" }} />
          </IconButton>
        </Fab>
      </Tooltip>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {loggedInuserData.username[0]}
            </Avatar>
            <Typography fontWeight={500} variant="span">
              {loggedInuserData.username}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            onChange={handleCaptionChange}
            value={caption}
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <Input type="file" onChange={onFileChange} />
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handlePost}>Post</Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default AddPost;
