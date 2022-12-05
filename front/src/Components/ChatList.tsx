import {
  Box,
  Text,
  Stack,
  Button,
  Avatar,
  StackDivider,
  AvatarBadge,
} from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import CreateGroupModal from "./CreateGroupModal";
import { AppState } from "../Context/AppProvider";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const ChatList = () => {
  const { user, setShowUP, rooms, users, selectedRoom, setSelectedRoom, usersList } =
    AppState();
  
  const getFirstUser = (room: any) => {
      return users.find((ele: any) => ele.id === room.RoomUsers[0].userId);
  }

  const setChatBoxData = async (room: any) => {
    setSelectedRoom(room);
    if (room.isGroupChat && usersList)
      setShowUP(undefined);
    else if (usersList)
      setShowUP(() => getFirstUser(room));
  };

  const thereIsSomeOneOnline = (roomUsers: any): boolean => {
    return roomUsers.some(({ userId }: any) => {
      return users.some((ele: any) => {
        return ele.id === userId && ele.isOnline === true;
      });
    });
  };

  return (
    <Box
      display={{ base: selectedRoom ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "35%" }}
      borderRadius="lg"
      borderWidth="1px"
      minWidth="370px"
    >
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        <Text
          fontSize="25px"
          fontFamily="Work sans"
          height="50px"
          mb="5px"
          ml="5px"
        >
          Contacts
        </Text>
        <CreateGroupModal>
          <Button ml="20px" leftIcon={<AiOutlineUsergroupAdd size="25px" />}>
            create new group
          </Button>
        </CreateGroupModal>
      </Box>
      {rooms ? (
        <Stack
          width="100%"
          overflowY="auto"
          spacing={0}
          css={{
            "::-webkit-scrollbar": {
              width: "0px",
            },
          }}
          divider={<StackDivider borderColor="gray.200" />}
          borderBottom="1px #EEEEEE solid"
          borderTop="1px #EEEEEE solid"
        >
          {rooms.map((room: any) => (
            <Box
              cursor={"pointer"}
              height="80px"
              display="flex"
              alignItems={"center"}
              bg={selectedRoom === room ? "#EEEEEE" : "white"}
              borderRadius="5px"
              p="5px"
              fontFamily="Inter"
              fontWeight="bold"
              fontSize="17px"
              onClick={() => setChatBoxData(room)}
              key={room.id}
            >
              <Avatar
                borderRadius="5px"
                color="white"
                bg="teal"
                name={room.name}
                src={ room.isGroupChat ? undefined : getFirstUser(room).imageUrl}
              >
                {thereIsSomeOneOnline(room.RoomUsers) ? (
                  <AvatarBadge boxSize="0.9em" bg="#00FF00" />
                ) : (
                  <AvatarBadge boxSize="0.9em" bg="#FF0000" />
                )}
              </Avatar>
              <Box ml="20px" display="flex" flexDirection="column">
                <Text p="4px 0px">{room.name}</Text>
                <Text fontSize="15px" fontFamily={"work sans"} color="gray.400">
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
