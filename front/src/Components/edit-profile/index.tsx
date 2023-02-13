import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  Avatar,
  Box,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppState } from "../../Context/AppProvider";
import { AiOutlineSave } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoBackspaceOutline } from "react-icons/io5";
import axios from "axios";
const EditProfile = () => {
  const { openEditProfile, setOpenEditProfile, user, setUser } = AppState();
  const [file, setFile] = useState<File | null>(null);
  const [login, setLogin] = useState<string>(user.login || "");
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl || "");
  const handleClose = () => {
    setOpenEditProfile(false);
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("login", login);
      if (file) formData.append("imageUrl", file);
      const res = await axios.patch("/api/user/update", formData);
      if (res.status === 200) {
        setUser({
          ...user,
          login: login,
          imageUrl: imageUrl,
        });

        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.login) setLogin(user.login);
    if (user && user.imageUrl) setImageUrl(user.imageUrl || "");
  }, [user]);
  return (
    <Modal isCentered isOpen={openEditProfile} onClose={handleClose}>
      {/* <ModalOverlay /> */}
      <ModalContent
        maxWidth={"30rem"}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        gap="2rem"
        backgroundColor={"#ffffff7f"}
        backdropFilter={"blur(10px)"}
      >
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <Box width={"15rem"} height={"15rem"} position={"relative"}>
          <Avatar
            shadow="xl"
            fontSize="9xl"
            bg="chakra-placeholder-color"
            color="white"
            size="full"
            cursor="pointer"
            name={user.login}
            src={imageUrl}
          />
          <Input
            type="file"
            id="file"
            display={"none"}
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                setFile(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  if (reader.result) {
                    setImageUrl(reader.result.toString());
                  }
                };
              }
            }}
          />
          <label
            htmlFor="file"
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              cursor: "pointer",
              borderRadius: "50%",
            }}
          >
            <MdEdit fontSize={"1.5rem"} />
          </label>
        </Box>
        <Box>
          <Input
            placeholder="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            id="login"
          />
        </Box>

        <ModalFooter
          display={"flex"}
          justifyContent="space-evenly"
          width={"100%"}
        >
          <Button colorScheme="blue" onClick={handleClose}>
            <Box mx={2}>Calcel</Box>
            <IoBackspaceOutline fontSize={"1.5rem"} />
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={saveProfile}>
            <Box mx={2}>Save</Box>
            <AiOutlineSave fontSize={"1.5rem"} />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
