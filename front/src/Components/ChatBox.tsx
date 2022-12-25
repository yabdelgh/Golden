import { ImUsers, ImUser } from "react-icons/im";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import ChatConfigModal from "./ChatConfigModal";
import { TfiFaceSmile } from "react-icons/tfi";
import { BsFillMicFill } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RoomUser } from "../../types";
import { getUserByName, thereIsSomeOneOnline } from "../Utils/rooms";
const ChatBox = () => {
  const {
    user,
    setShowUP,
    socket,
    showUP,
    users,
    selectedRoom,
    setSelectedRoom,
    usersList,
    setUsersList,
    msgs,
  } = AppState();
  const [msg, setMsg] = useState("");

  const sendMessage = () => {
    socket.emit("chatMsg", { roomId: selectedRoom.id, msg });
  };
  
  const getUserName = (id: number) => {
    const ret = users.find((user: any) => {
      return user.id === id;
    });
    if (!ret) return user.login;
    return ret.login;
  };

  const isMember = (userId: number): boolean => {
    if (selectedRoom.isGroupChat)
      return selectedRoom.RoomUsers.some((object: RoomUser) => 
        object.userId === userId && object.status === 'Member'
      )
    return true;
  }


  return (
    <Box
      display={{
        base: selectedRoom && !usersList && !showUP ? "flex" : "none",
        md: !usersList && !showUP ? "flex" : "none",
        xl: "flex",
      }}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width={{ base: "100%", sm: "75%", xl: "60%" }}
      minWidth="400px"
      border="3px white solid"
      borderRadius="5px"
      ml="10px"
      bgColor="#E9EBEE"
    >
      {selectedRoom ? (
        <>
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
              <Avatar
                bg="teal"
                color="white"
                borderRadius={"5px"}
                name={selectedRoom.name}
                src={
                  selectedRoom.isGroupChat ? undefined : getUserByName(users, selectedRoom.name)?.imageUrl
                }
              >
                {thereIsSomeOneOnline(users, selectedRoom) ? (
                  <AvatarBadge boxSize="0.9em" bg="#00FF00" />
                ) : (
                  <AvatarBadge boxSize="0.9em" bg="#FF0000" />
                )}
              </Avatar>
              <Text ml="18px">{selectedRoom.name}</Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="90px"
              mr="15px"
              p="5px"
            >
              <Popover placement="left-start">
                <PopoverTrigger>
                  <Button variant={"unstyled"}>
                    <BsThreeDotsVertical size="25px" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="160px">
                  <PopoverArrow />
                  <PopoverBody>
                    <ChatConfigModal>
                      <Button variant="unstyled" width="100%">
                        settings
                      </Button>
                    </ChatConfigModal>
                    <Button
                      onClick={() => {
                        setSelectedRoom(undefined);
                      }}
                      variant={"unstyled"}
                      width="100%"
                    >
                      close this chat
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <IconButton
                variant={"ghost"}
                aria-label="Member List"
                onClick={() =>
                  selectedRoom.isGroupChat
                    ? (setUsersList(!usersList) && setShowUP(undefined))
                    : setShowUP((value: any) => {
                        if (value)
                          return undefined 
                        else
                          return getUserByName(users, selectedRoom.name);
                      })
                }
                icon={
                  selectedRoom.isGroupChat ? (
                    <ImUsers size="25px" />
                  ) : (
                    <ImUser size="25px" />
                  )
                }
              />
            </Box>
          </Box>
          <Box width="100%" height="82%" overflow={"scroll"} overflowX="hidden">
            {msgs.length !== 0 ? (
              msgs.map((msg: any) => {
                if (msg.roomId === selectedRoom.id)
                  return (
                    <Box
                      key={msg.id}
                      pl="30px"
                      color="gray"
                      fontWeight="bold"
                      pt="20px"
                      pr="30px"
                    >
                      <Box display="flex" alignItems="center">
                        <Text fontSize="15px" fontWeight="bolder" color="black">
                          {getUserName(msg.userId)}
                        </Text>
                        <Text fontSize="12px" color="gray.400" ml="3px">
                          {isMember(msg.userId) ? "" : "(ExMember)"}
                        </Text>
                        <Text pl="7px">{msg.createdAt}</Text>
                      </Box>
                      {msg.msg}
                    </Box>
                  );
                else return undefined;
              })
            ) : (
              <></>
            )}
          </Box>
          <InputGroup
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            minHeight="50px"
          >
            <Input
              fontFamily={"Inter"}
              pl="50px"
              fontWeight="bolder"
              width="98%"
              bg="white"
              height="8%"
              minHeight="50px"
              m="10px"
              value={msg}
              placeholder="Type a message"
              focusBorderColor="gray.100"
              onChange={(e) => setMsg(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                  setMsg("");
                }
              }}
            />
            <InputLeftElement ml={"25px"} height="100%">
              <IconButton
                variant={"unstyled"}
                aria-label="emoji"
                icon={<TfiFaceSmile size="30px" color="gray" />}
              />
            </InputLeftElement>
            <InputRightElement mr={"20px"} height="100%">
              <IconButton
                variant={"unstyled"}
                aria-label="mic"
                icon={<BsFillMicFill size="25px" color="gray" />}
              />
            </InputRightElement>
          </InputGroup>
        </>
      ) : (
        <Text fontSize="20px" color="blackAlpha.500">
          Select a room to start chatting
        </Text>
      )}
    </Box>
  );
};

export default ChatBox;
