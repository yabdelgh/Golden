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
import { IoBackspaceOutline } from "react-icons/io5";
import axios from "axios";
import { z } from "zod";
import { errorToast } from "../../Utils/Toast";
import { HiOutlineMail } from "react-icons/hi";
import { FaFileUpload } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsCardImage } from "react-icons/bs";

const updatUserSchema = z.object({
  login: z.string().min(3).max(20),
  email: z.string().email(),
  imageUrl: z.string().url(),
});

const EditProfile = () => {
  const { openEditProfile, setOpenEditProfile, user, setUser, toast } =
    AppState();
  const [file, setFile] = useState<File | null>(null);
  const [login, setLogin] = useState<string>(user.login || "");
  const [email, setEmail] = useState<string>(user.email || "");
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl || "");
  const handleClose = () => {
    setOpenEditProfile(false);
  };

  const handlFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (e.target.files) {
      const file = e.target.files[0];
      // check file type is image
      if (!file.type.match("image.*")) {
        errorToast(toast, "File is not an image");
        return;
      }

      // check file size
      if (file.size > maxSize) {
        errorToast(
          toast,
          `file size is too large, max size is ${maxSize / 1024}kb `
        );
        return;
      }

      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result.toString());
        }
      };
    }
  };

  const saveProfile = async () => {
    try {
      updatUserSchema.parse({
        login,
        email,
        imageUrl,
      });
    } catch (e) {
      const err = e as z.ZodError;
      console.log(e);
      errorToast(toast, err.issues[0].message);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("login", login);
      if (file) formData.append("imageUrl", file);
      const res = await axios.patch("http://localhost:3333" + "/api/user/update", formData);
      if (res.status === 200) {
        setUser({
          ...user,
          login: login,
          imageUrl: imageUrl,
          isFirstLogin: false,
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
    if (user && user.email) setEmail(user.email || "");
  }, [user]);
  return (
    <Modal
      isCentered
      isOpen={openEditProfile || user.isFirstLogin}
      onClose={handleClose}
    >
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
        {!user?.isFirstLogin && <ModalCloseButton />}
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
          <label htmlFor="file">
            <Box
              position={"absolute"}
              top={"0"}
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={"#ffffff"}
              opacity={0}
              borderRadius={"50%"}
              cursor={"pointer"}
              transition={"opacity 0.3s ease"}
              _hover={{
                opacity: 0.3,
              }}
            >
              <FaFileUpload fontSize={"4rem"} />
            </Box>
          </label>

          <Input type="file" id="file" display={"none"} onChange={handlFile} />
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
            <BsCardImage fontSize={"1.5rem"} />
          </label>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Input
            placeholder="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            id="login"
          />
          <label htmlFor="login">
            <HiOutlineUserCircle fontSize={"1.5rem"} />
          </label>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <label htmlFor="email">
            <HiOutlineMail fontSize={"1.5rem"} />
          </label>
        </Box>

        <ModalFooter
          display={"flex"}
          justifyContent="space-evenly"
          width={"100%"}
        >
          {!user?.isFirstLogin && (
            <Button colorScheme="blue" onClick={handleClose}>
              <Box mx={2}>Calcel</Box>
              <IoBackspaceOutline fontSize={"1.5rem"} />
            </Button>
          )}
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
