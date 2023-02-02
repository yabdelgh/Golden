import { EditIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import ChangeAvatarModal from "../ChangeAvatarModal";

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
          <Box position={"relative"}>
            <Image
              borderRadius="100%"
              width="180px"
              height="190px"
              m="10px"
              src={userProfile.imageUrl || "/defaultProfilePic.png"}
            />
            <ChangeAvatarModal username={userProfile.login} link={userProfile.imageUrl || "/defaultProfilePic.png"}>
              <button
                style={{ position: "absolute", bottom: "25px", right: "25px" }}
                >
                <EditIcon w={7} h={7} color="black.600"/>
              </button>
            </ChangeAvatarModal>
          </Box>
          <Text fontSize="30px" color="gray.600">
            {userProfile.login}
          </Text>
        </Box>
      )}
    </>
  );
};

export default ProfileBar;