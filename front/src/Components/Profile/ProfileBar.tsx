import { Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";
import FriendButton from "../Buttons/FriendButton";
import MessageButton from "../Buttons/MessageButton";
import { FaClipboardList } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

type BlockUserDto = {
  blockedId: number;
};

const ProfileBar = (props: any) => {
  const { userProfile, user, blockedUsers, socket, setUserProfile } =
    AppState();
  const navigate = useNavigate();
  const BlockUser = async () => {
    socket.emit("blockUser", {
      blockedId: userProfile.id,
    } as BlockUserDto);
  };

  const UnblockUser = () => {
    socket.emit("unblockUser", {
      blockedId: userProfile.id,
    } as BlockUserDto);
  };

  const isBlocked = (): boolean =>
    blockedUsers.some(
      (u) => u.blockedId === user.id || u.blockerId === user.id
    );

  useEffect(() => {
    if (userProfile.id === user.id) setUserProfile(user);
  }, [user]);

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      width="320px"
      bg="#2B2D31"
      // className="debug"
      // justifyContent={"center"}
    >
      {userProfile && (
        <>
          <Box
            height="fit-content"
            display="flex"
            flexDir="column"
            alignItems="center"
            borderRadius="lg"
            mt="30px"
            // justifyContent="center"
          >
            <Box width="10rem" height="10rem" mb="10px">
              <Avatar
                shadow="xl"
                border="3px solid #1E1F22"
                fontSize="9xl"
                bg="chakra-placeholder-color"
                color="white"
                size="full"
                cursor="pointer"
                name={userProfile.login}
                src={userProfile.imageUrl || "/defaultProfilePic.png"}
              />
            </Box>
            <Text fontSize="30px" color="gray.600">
              {userProfile.login}
            </Text>
          </Box>
          <Box width="96%" mt="30px" display="flex" flexDir="column">
            <Button
              pl="20px"
              display="flex"
              justifyContent={"flex-start"}
              leftIcon={<HiHome size="20px" />}
              borderRadius="5px"
              height="50px"
              color="#B8B9BF"
              variant="unstyled"
              fontSize="20px"
              bg={props.boxName === "Profile" ? "#36373D" : "#2B2D31"}
              onClick={() => props.setBoxName("Profile")}
            >
              Home
            </Button>
            <Button
              pl="20px"
              display="flex"
              justifyContent={"flex-start"}
              leftIcon={<FaUserFriends size="20px" />}
              borderRadius="5px"
              height="50px"
              color="#B8B9BF"
              variant="unstyled"
              fontSize="20px"
              bg={props.boxName === "Friend List" ? "#36373D" : "#2B2D31"}
              onClick={() => props.setBoxName("Friend List")}
            >
              Friend List
            </Button>
            <Button
              pl="20px"
              display="flex"
              justifyContent={"flex-start"}
              borderRadius="5px"
              leftIcon={<FaClipboardList size="20px" />}
              height="50px"
              color="#B8B9BF"
              variant="unstyled"
              fontSize="20px"
              bg={props.boxName === "Match History" ? "#36373D" : "#2B2D31"}
              onClick={() => props.setBoxName("Match History")}
            >
              Match History
            </Button>
          </Box>
          {userProfile.id !== user.id && (
            <Box
              display="flex"
              height="fit-content"
              justifyContent="space-between"
              flexDir="column"
              alignItems="center"
              width="96%"
              mt="50px"
            >
              <Button
                height="45px"
                width="100%"
                display="flex"
                p="0px 30px"
                mb="2px"
                justifyContent={"space-between"}
                borderRadius="3px"
                alignItems="center"
                variant="unstyled"
                bg="#36373D"
                rightIcon={<IoIosArrowForward />}
                color="gray.200"
                onClick={
                  blockedUsers.find(
                    (blockedUser) => blockedUser.blockedId === userProfile.id
                  )
                    ? UnblockUser
                    : BlockUser
                }
              >
                {blockedUsers.find(
                  (blockedUser) => blockedUser.blockedId === userProfile.id
                )
                  ? "Unblock"
                  : "Block"}
              </Button>
              {!isBlocked() && (
                <>
                  <MessageButton target={userProfile} icon={false} />
                  <FriendButton target={userProfile} icon={false} />
                </>
              )}
              {userProfile && userProfile.inGame && (
                <Button
                  height="45px"
                  width="100%"
                  display="flex"
                  mb="2px"
                  p="0px 30px"
                  justifyContent={"space-between"}
                  alignItems="center"
                  borderRadius="3px"
                  variant="unstyled"
                  bg="#36373D"
                  rightIcon={<IoIosArrowForward />}
                  color="gray.200"
                  onClick={() => navigate(`/live-game/${userProfile?.gameId}`)}
                >
                  {"Watch Game"}
                </Button>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfileBar;
