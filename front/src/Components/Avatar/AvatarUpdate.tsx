import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";

const AvatarPreview = ({ username, link }: any) => {
  const [avatar, setAvatar] = useState(link);
  const avatarRef = useRef<HTMLInputElement>(null);

  const updateAvatar = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
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
        <Button width="70%" m="1rem" bg="green.300">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarPreview;
