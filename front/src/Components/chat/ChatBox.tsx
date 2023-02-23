import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import { useState } from "react";
import { TfiFaceSmile } from "react-icons/tfi";
import { BsFillMicFill } from "react-icons/bs";
import { RoomUser } from "../../../types";
import { getUserByName, thereIsSomeOneOnline } from "../../Utils/rooms";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import UserProfile from "../UserProfile";
import UsersList from "./UsersList";
import { errorToast } from "../../Utils/Toast";
import ChatSettings from "./chatSettings";

const ChatBox = () => {
  const {
    user,
    socket,
    users,
    selectedRoom,
    usersList,
    msgs,
    showUP,
    toast,
    blockedUsers,
  } = AppState();

  const [msg, setMsg] = useState("");
  const isBlocked = (userId: number): boolean => {
    if (userId === user.id) return false;
    return blockedUsers.some(
      (u) => u.blockedId === userId || u.blockerId === userId
    );
  };
  const sendMessage = () => {
    const maxMsgSize = 100;
    const message = msg.trim();
    if (message === "") return;
    // check message size
    if (message.length > maxMsgSize) {
      errorToast(
        toast,
        `message size is too large, max size is ${maxMsgSize} characters `
      );
      return;
    }
    socket.emit("chatMsg", { roomId: selectedRoom.id, msg });
  };

  const isMuted = () => {
    if (selectedRoom.isGroupChat === false) {
      const chatUser: any = getUserByName(users, selectedRoom.name);

      if (!chatUser) return false;
      if (
        blockedUsers.some(
          (u) => u.blockedId === chatUser.id || u.blockerId === chatUser.id
        )
      )
        return true;
    }
    return selectedRoom.RoomUsers?.some(
      (ele: RoomUser) => ele.userId === user.id && ele.mute
    );
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
      return selectedRoom.RoomUsers.some(
        (object: RoomUser) =>
          object.userId === userId && object.status === "Member"
      );
    return true;
  };

  return (
    <Box
      width="100%"
      bg="white"
      height="100%"
      // borderRadius="lg"
      border="3px white solid"
    >
      {selectedRoom ? (
        <>
          <Box
            height="50px"
            pl="15px"
            display="flex"
            alignItems="center"
            bgColor="white"
            fontFamily="Inter"
            fontWeight="bold"
            fontSize="18px"
            width="100%"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                border="6px solid white"
                bg="teal"
                color="white"
                name={selectedRoom.name}
                src={
                  selectedRoom.isGroupChat
                    ? undefined
                    : getUserByName(users, selectedRoom.name)?.imageUrl
                }
              >
                {thereIsSomeOneOnline(users, selectedRoom) ? (
                  <AvatarBadge boxSize="0.9em" bg="#00FF00" />
                ) : (
                  <AvatarBadge boxSize="0.9em" bg="#FF0000" />
                )}
              </Avatar>
              <Text ml="10px">{selectedRoom.name}</Text>
            </Box>
            <ChatSettings />
          </Box>
          <Box
            width="100%"
            height="calc(100% - 50px)"
            display={"flex"}
            flexDirection="row-reverse"
          >
            {(showUP || usersList) && (
              <Box className="md-none scale-up " width="20rem">
                {showUP && <UserProfile showUP={showUP} />}
                {usersList && <UsersList />}
              </Box>
            )}
            <Box
              flexGrow={1}
              wordBreak="break-word"
              height="100%"
              borderRadius="5px"
              bgColor="#BAD1C2"
              border="3px solid white"
            >
              <Box width="100%" height="calc(100% - 70px)" overflow={"hidden"}>
                {msgs.length !== 0 &&
                  msgs
                    .filter((msg) => !isBlocked(msg.userId))
                    .map((msg: any) => {
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
                              <Text
                                fontSize="15px"
                                fontWeight="bolder"
                                color="black"
                              >
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
                    })}
              </Box>
              <InputGroup
                display="flex"
                alignItems={"center"}
                justifyContent="center"
                minHeight="50px"
              >
                <Input
                  fontFamily={"Inter"}
                  pl="60px"
                  fontWeight="bolder"
                  width="99%"
                  bg="white"
                  isDisabled={isMuted()}
                  height="40px"
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
                    isDisabled={isMuted()}
                    variant={"unstyled"}
                    aria-label="emoji"
                    icon={<TfiFaceSmile size="30px" color="gray" />}
                  />
                </InputLeftElement>
                <InputRightElement mr={"20px"} height="100%">
                  <IconButton
                    isDisabled={isMuted()}
                    variant={"unstyled"}
                    aria-label="mic"
                    icon={<BsFillMicFill size="25px" color="gray" />}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          height="90%"
          color="gray.400"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          fontSize={"50px"}
        >
          <HiOutlineChatBubbleLeftRight size="100px" />
          <Text fontSize="25px" mt="50px">
            Select a room to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
