import { Box, Button, cookieStorageManager, Image, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";
import axios from "axios";

const AvatarPreview = ({ username, link }: any) => {
  const [avatar, setAvatar] = useState(link);
  const [file, setFile] = useState(null);
  const [fileInServer, setFileInServer] = useState(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const updateAvatar = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
  };

  const saveAvatar = async () => {
    if (!file || file === fileInServer) return;
    const formData = new FormData();
    formData.append("avatar", file);
    await axios.put("http://localhost:3333/api/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    });
    setFileInServer(file);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"350px"}
      height={"500px"}
      margin={"auto"}
      padding={"auto"}
      fontFamily="Inter"
    >
      <Text fontWeight={"bold"} fontSize={"32px"} mb={"2rem"}>
        Change Avatar
      </Text>
      <Image borderRadius="100%" boxSize="200px" src={avatar} alt={username} />
      <Box
        display="flex"
        justifyContent="space-around"
        width={"100%"}
        mt="2rem"
      >
        <input
          type="file"
          accept="image/*"
          hidden
          ref={avatarRef}
          onChange={updateAvatar}
        />
        <Button
          width="70%"
          m="1rem"
          bg="green.300"
          onClick={() => {
            avatarRef.current?.click();
          }}
        >
          Choose Avatar
        </Button>
        <Button
          width="70%"
          m="1rem"
          bg="green.300"
          isDisabled={!file || file === fileInServer}
          onClick={saveAvatar}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarPreview;
