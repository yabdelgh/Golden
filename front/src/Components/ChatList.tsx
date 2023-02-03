import {
  Box,
  Text,
  Stack,
  Button,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import CreateGroupModal from "./CreateGroupModal";
import { AppState } from "../Context/AppProvider";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getUserByName, thereIsSomeOneOnline } from "../Utils/rooms";

const ChatList = () => {
  const {
    setShowUP,
    rooms,
    users,
    selectedRoom,
    setSelectedRoom,
    setUsersList,
    usersList,
    showUP,
  } = AppState();

  const setChatBoxData = async (room: any) => {
    setSelectedRoom(room);
    if (room.isGroupChat && (usersList || showUP)) {
      setShowUP(undefined);
      setUsersList(true);
    }
    if (!room.isGroupChat && (usersList || showUP)) {
      setShowUP(getUserByName(users, room.name));
      setUsersList(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      p="3"
      top='70'
      left='85'
      borderRadius={'lg'}
      bg="white"
      height='calc(100% - 80px)'
      position='fixed'
      w={{base: '290px', md: '360px'}}
    >
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="25px" fontFamily="Work sans" height="50px" m="5px">
          Contacts
        </Text>
        <CreateGroupModal>
          <Button ml="10px" leftIcon={<AiOutlineUsergroupAdd size="25px" />}>
            <Text display={{ base: "none", xl: "flex" }}>create new group</Text>
          </Button>
        </CreateGroupModal>
      </Box>
      {rooms ? (
        <Stack
          width="100%"
          overflowY="auto"
          spacing={0}
        // divider={<StackDivider borderColor="gray.200" />}
        // borderBottom="1px #EEEEEE solid"
        // borderTop="1px #EEEEEE solid"
        >
          {rooms.map((room: any) => (
            <Box
              cursor={"pointer"}
              height="65px"
              display="flex"
              alignItems={"center"}
              bg={selectedRoom === room ? "#EEEEEE" : "white"}
              borderRadius="15px"
              p="5px"
              fontFamily="Inter"
              fontWeight="bold"
              fontSize="17px"
              onClick={() => setChatBoxData(room)}
              key={room.id}
            >
              <Avatar
                color="white"
                bg="teal"
                ml='10px'
                size={'md'}
                border='3px solid white'
                name={room.name}
                src={
                  room.isGroupChat
                    ? undefined
                    : getUserByName(users, room.name)?.imageUrl ||
                    "/defaultProfilePic.png"
                }
              >
                {thereIsSomeOneOnline(users, room) ? (
                  <AvatarBadge boxSize="0.9em" bg="#00FF00" />
                ) : (
                  <AvatarBadge boxSize="0.9em" bg="#FF0000" />
                )}
              </Avatar>
              <Box ml="20px" display="flex" flexDirection="column">
                <Text p="4px 0px">{room.name}</Text>
                <Text fontSize="14px" fontFamily={"work sans"} color="gray.400">
                  {room.lastMsg && room.lastMsg.slice(0, 20)}
                  {room.lastMsg && room.lastMsg.length > 20 ? " ..." : ""}
                </Text>
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <ChatLoading />
      )}
    </Box>
  );
};

export default ChatList;
