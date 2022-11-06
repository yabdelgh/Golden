import { Avatar, AvatarBadge, Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Text } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
const ChatBox = () => {
  const { selectedRoom } = ChatState();

  return (
    <Box
      display={{ base: selectedRoom ? "flex" : "none", md: "flex" }}
      width={{ base: "100%", sm: "75%", xl: "60%" }}
      minWidth="400px"
      bg="white"
      border="3px white solid"
      borderRadius="5px"
      ml="10px"
      bgColor="gray.200"
    >
      {selectedRoom ? (
        <Box
          // border="3px red solid"
          height="10%"
          pl="15px"
          display="flex"
          alignItems="center"
          minHeight="65px"
          bgColor="white"
          fontFamily="Inter"
          fontWeight="bold"
          fontSize="20px"
          width="100%"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Avatar name={selectedRoom.room.name}>
              <AvatarBadge boxSize="0.9em" bg="#FF0000" />
            </Avatar>
            <Text ml="18px">{selectedRoom.room.name}</Text>
          </Box>
          <Box mr="15px" p="5px">
            <ProfileModal user={{ login: "yassine" }}>
              <BiDotsVerticalRounded size={"25px"} />
            </ProfileModal>
          </Box>
        </Box>
      ) : (
        <ChatLoading />
      )}
      <Box m="0" p="0" borderRadius={"5px"} bgColor="gray.300"></Box>
    </Box>
  );
};

export default ChatBox;
