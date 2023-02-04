import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import ChangeAvatarModal from "../ChangeAvatarModal";
import FriendButton from "../Buttons/FriendButton";
import MessageButton from "../Buttons/MessageButton";
import { useState } from "react";

const ProfileBar = () => {
  const { userProfile, Friends, user } = AppState();
  const [hiddenButton, setHiddenButton] = useState(true);

  const handleMouseEnter = () => {
    setHiddenButton(false);
  };

  const handleMouseLeave = () => {
    setHiddenButton(true);
  };

  return (
    <Box
      width={{ base: "100%", xl: "49%" }}
      backgroundImage="linear-gradient(teal 50%, white 0%)"
      h={{ base: "600px", xl: "48%" }}
      display="flex"
      flexDir="column"
      alignItems="center"
      borderRadius="lg"
      justifyContent={"center"}
      mb="20px"
    >
      {userProfile && (
        <>
          <Box
            height="70%"
            display="flex"
            flexDir="column"
            alignItems="center"
            borderRadius="lg"
            justifyContent={"center"}
          >
            <Box position={"relative"}>
              {
                <Image
                  borderRadius="100%"
                  width="180px"
                  height="190px"
                  m="10px"
                  src={userProfile.imageUrl || "/defaultProfilePic.png"}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              }
              <ChangeAvatarModal
                username={userProfile.login}
                link={userProfile.imageUrl || "/defaultProfilePic.png"}
              >
                <button
                  hidden={hiddenButton}
                  style={{
                    position: "absolute",
                    bottom: "40%",
                    right: "40%",
                    background: "#e3e3e3aa",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <PlusSquareIcon w={7} h={7} />
                </button>
              </ChangeAvatarModal>
            </Box>
            <Text fontSize="30px" color="gray.600">
              {userProfile.login}
            </Text>
          </Box>
          {userProfile.id !== user.id && (
            <Box>
              <MessageButton target={userProfile} icon={false} />
              <FriendButton target={userProfile} icon={false} />
            </Box>
          )}
          {/* <Box display='flex' width='40%' justifyContent={'space-around'}>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            color='gray'
            mt="100px"
          >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {Friends.length}
            </Text>
            <Text>Friends</Text>
          </Box>

          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            color='gray'
            mt="100px"
          >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {Friends.length}
            </Text>
            <Text>Games</Text>
          </Box>
          </Box> */}
        </>
      )}
    </Box>
  );
};

export default ProfileBar;
