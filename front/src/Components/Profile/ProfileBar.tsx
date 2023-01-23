import { Box, Image, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";

const ProfileBar = () => {
  const { userProfile } = AppState();
  return (
    <>
      {userProfile && (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          pt="30px"
          w={{ base: "230px", md: "360px" }}
          h="100%"
          bg="white"
          position={"fixed"}
          top="70"
          left="71"
        >
          <Image
            borderRadius="100%"
            width="180px"
            height="190px"
            m="10px"
            src={userProfile.imageUrl || "/defaultProfilePic.png"}
          />
          <Text fontSize="30px" color="gray.600">
            {userProfile.login}
          </Text>
        </Box>
      )}
    </>
  );
};

export default ProfileBar;