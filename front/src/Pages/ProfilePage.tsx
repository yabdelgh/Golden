import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Lottie from "react-lottie";
import ChatHeader from "../Components/ChatHeader";
import { AppState } from "../Context/AppProvider";
import FriendsPage from "./FriendsPage";
import animationData from "./robot-says-hello.json";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
const ProfilePage = () => {
  const { user, userProfile, setUserProfile, Friends } = AppState();

  useEffect(() => {
    if (!userProfile.login && user.login) setUserProfile(() => user);
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box
      display="flex"
      flexDir="column"
      width="100%"
      alignItems="center"
    >
      <ChatHeader />
      {userProfile && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="60%"
          minWidth="600px"
          height="250px"
          minHeight="250px"
          mt="70px"
          borderRadius="lg"
          bg="linear-gradient(to right,teal, white)"
        >
          <Box display="flex" height="100%" alignItems="center">
            <Image
              ml="30px"
              width="190px"
              height="190px"
              borderRadius="100%"
              src={userProfile.imageUrl}
            />
            <Box height="100%" p="50px" minWidth={"300px"}>
              <Text
                fontSize="40px"
                color="gray.700"
                fontWeight="bold"
                mb="10px"
              >
                {userProfile.login}
              </Text>
              <Text
                color="gray.600"
                fontSize="25px"
                fontFamily="Inter"
                fontWeight="bold"
              >
                {`${Friends.length} friends`}
              </Text>
              <AvatarGroup size="md" max={5}>
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
                <Avatar name="Kent Dodds" src="https://bit.ly/code-beast" />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
              </AvatarGroup>
            </Box>
          </Box>
          <Box
            height="60%"
            minWidth="250px"
            display={{ base: "none", xl: "flex" }}
          >
            <Lottie options={defaultOptions} />
          </Box>
        </Box>
      )}
      <FriendsPage />
    </Box>
  );
};

export default ProfilePage;
