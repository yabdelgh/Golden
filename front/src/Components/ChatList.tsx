import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import CreateGroupModal from "./CreateGroupModal";
const ChatList = () => {
  const { rooms, selectedRoom, setSelectedRoom } = ChatState();
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
              key={room.room.id}
              fontFamily="Inter"
              fontWeight="bold"
              fontSize="17px"
              onClick={() => setSelectedRoom(room)}
            >
              <Avatar name={room.room.name}>
                <AvatarBadge
                  bg={selectedRoom !== room ? "#FF0000" : "#00FF00"}
                  boxSize="0.9em"
                />
              </Avatar>
              <Box ml="20px" display="flex" flexDirection="column">
                <Text p="4px 0px">{room.room.name}</Text>
                <Text fontSize="15px" fontFamily={"work sans"} color="gray.400">
                  hello {room.room.name}
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
