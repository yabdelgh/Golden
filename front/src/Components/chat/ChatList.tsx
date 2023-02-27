import {
  Box,
  Text,
  Stack,
  Button,
  Avatar,
  AvatarBadge,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import CreateGroupModal from "./CreateGroupModal";
import { AppState } from "../../Context/AppProvider";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getUserByName, thereIsSomeOneOnline } from "../../Utils/rooms";
import { BsSearch } from "react-icons/bs";

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
      bg="#2B2D31"
      height="100%"
      minW="350px"
      color="gray.400"
    >
      <CreateGroupModal>
        <Button
          m="5px 2% 3px 2%"
          leftIcon={<AiOutlineUsergroupAdd size="25px" />}
          width="96%"
          height="50px"
          bg="#2E3035"
          display="flex"
          _hover={{ color: "white" }}
          // justifyContent={"flex-start"}
          alignItems="center"
          borderRadius="5px"
          variant={"unstyled"}
          color="#B8B9BF"
        >
          <Text display="flex" width="fit-content">
            create new group
          </Text>
        </Button>
      </CreateGroupModal>
      <FormControl height="50px" width="96%" m="1% 2% 10px 2%" color="#B8B9BF">
        <InputGroup
          borderColor="#2E3035"
          bg="#2E3035"
          height="50px"
          borderRadius="5px"
        >
          <Input
            placeholder="Find a conversation"
            height="100%"
            focusBorderColor="#2E3035"
            color="gray.200"
          />
          <InputRightElement>
            <IconButton
              variant={"unstyled"}
              mt="10px"
              aria-label="Search User"
              icon={<BsSearch color="gray.400" />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {rooms ? (
        <Stack width="96%" m="2%" overflowY="auto" spacing={0}>
          {rooms.map((room: any) => (
            <Box
              cursor={"pointer"}
              height="55px"
              mb="2px"
              display="flex"
              alignItems={"center"}
              bg={selectedRoom === room ? "#36373D" : "#2B2D31"}
              borderRadius="5px"
              fontFamily="Inter"
              fontWeight="bold"
              fontSize="17px"
              onClick={() => setChatBoxData(room)}
              key={room.id}
            >
              <Avatar
                color="white"
                bg="gray"
                ml="10px"
                size={"md"}
                border={
                  selectedRoom === room
                    ? "5px solid #36373D"
                    : "5px solid #2B2D31"
                }
                name={room.name}
                src={
                  room.isGroupChat
                    ? undefined
                    : getUserByName(users, room.name)?.imageUrl ||
                      "/defaultProfilePic.png"
                }
              >
                {thereIsSomeOneOnline(users, room) ? (
                  <AvatarBadge
                    boxSize="0.8em"
                    bg="#5CB85C"
                    borderColor="#404249"
                  />
                ) : (
                  <AvatarBadge
                    boxSize="0.8em"
                    bg="#FF4136"
                    borderColor="#2E3035"
                  />
                )}
              </Avatar>
              <Box ml="10px" display="flex" flexDirection="column">
                <Text p="0px 0px" color="#B8B9BF">
                  {room.name}
                </Text>
                {/* <Text fontSize="14px" fontFamily={"work sans"} color="gray.400">
                  {room.lastMsg && room.lastMsg.slice(0, 20)}
                  {room.lastMsg && room.lastMsg.length > 20 ? " ..." : ""}
                </Text> */}
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
