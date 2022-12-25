import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import ChatHeader from "../Components/ChatHeader";
import { AppState } from "../Context/AppProvider";
import animationData from "./robot-says-hello.json";
import { IoIosPeople } from "react-icons/io";
import ChallengeButton from "../Components/Buttons/ChallengeButton";
import MessageButton from "../Components/Buttons/MessageButton";
import ParamButton from "../Components/Buttons/ParamButton";

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
    <>
      <ChatHeader />
      {userProfile && (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          border="3px solid white"
          alignItems="center"
          height="625px"
          width="500px"
          minHeight="400px"
          mt="100px"
          borderRadius="lg"
          background="linear-gradient(to Bottom, teal 40%, white 20%)"
        >
          <Image
            borderRadius="100%"
            width="180px"
            height="190px"
            minHeight="190px"
            bg="gray"
            m="10px"
            mt="50px"
            src={userProfile.imageUrl}
          />
          <Text fontSize="30px" color="gray.600">
            {userProfile.login}
          </Text>
          <Box display="flex" flexDir="column" alignItems="center" m="20px" mb='25px' >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {/* {Friends.length} */}
              521
            </Text>
            <Text color="gray.700">Friends</Text>
          </Box>
          <Box display="flex" height='90px'>
            <ChallengeButton target={userProfile} icon={true} />
            <MessageButton target={userProfile} icon={true} />
            <ParamButton target={userProfile} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
