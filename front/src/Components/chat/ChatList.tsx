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
  RadioGroup,
  HStack,
} from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import CreateGroupModal from "./CreateGroupModal";
import { AppState } from "../../Context/AppProvider";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getUserByName, thereIsSomeOneOnline } from "../../Utils/rooms";
import { BsSearch } from "react-icons/bs";
import RadioEx from "../RadioEx";
import { FcKey, FcLock } from "react-icons/fc";
import { GiWorld } from "react-icons/gi";

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
      // borderRadius="lg"
      bg="white"
      height="100%"
      w={{ base: "290px", md: "360px" }}
      mr="2px"
    >
        <FormControl height="30px" width="96%"m='2%' mb="10px">
          <InputGroup>
            <Input
              placeholder="Search"
              // value={searchKey}
              // onChange={(e) => setSearchKey(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant={"unstyled"}
                aria-label="Search User"
                icon={<BsSearch />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <CreateGroupModal>
          <Button m='2%'mb='10px' leftIcon={<AiOutlineUsergroupAdd size="25px" />} width='96%'>
            <Text display='flex' width='fit-content'>create new group</Text>
          </Button>
        </CreateGroupModal>
      {/* <Box display="flex" justifyContent="space-between" className="debug" >
        <Text fontSize="25px" fontFamily="Work sans" height="50px" m="5px">
          Contacts
        </Text>
        <CreateGroupModal>
          <Button ml="10px" leftIcon={<AiOutlineUsergroupAdd size="25px" />}>
            <Text display={{ base: "none", xl: "flex" }} width='fit-content'>create new group</Text>
          </Button>
        </CreateGroupModal>
      </Box> */}
      {rooms ? (
        <Stack
          width="96%"
          m='2%'
          overflowY="auto"
          spacing={0}
          // divider={<StackDivider borderColor="gray.200" />}
          // borderBottom="1px #EEEEEE solid"
          // borderTop="1px #EEEEEE solid"
        >
          {rooms.map((room: any) => (
            <Box
              cursor={"pointer"}
              height="55px"
              mb='2px'
              display="flex"
              alignItems={"center"}
              bg={selectedRoom === room ? "#EEEEEE" : "white"}
              borderRadius="10px"
              fontFamily="Inter"
              fontWeight="bold"
              fontSize="17px"
              onClick={() => setChatBoxData(room)}
              key={room.id}
            >
              <Avatar
                color="white"
                bg="teal"
                ml="10px"
                size={"md"}
                border={selectedRoom === room ? "3px solid #EEEEEE" : "5px solid white"}
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
                <Text p="4px 0px" color='gray.500'>{room.name}</Text>
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
