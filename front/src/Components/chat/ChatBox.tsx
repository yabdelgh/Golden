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
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { RoomUser } from "../../../types";
import { getUserByName, thereIsSomeOneOnline } from "../../Utils/rooms";
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
      bg="#2E3035"
      height="100%"
      // borderRadius="lg"
      // borderLeft="3px #232428 solid"
    >
      {selectedRoom ? (
        <>
          <Box
            height="60px"
            pl="15px"
            borderBottom="2px solid #2B2D31"
            display="flex"
            alignItems="center"
            bgColor="#2E3035"
            fontFamily="Inter"
            fontWeight="bold"
            fontSize="18px"
            width="100%"
            justifyContent="space-between"
            color='#B8B9BF'
          >
            <Box display="flex" alignItems="center">
              <Avatar
                border="6px solid #2E3035"
                bg="gray"
                name={selectedRoom.name}
                src={
                  selectedRoom.isGroupChat
                    ? undefined
                    : getUserByName(users, selectedRoom.name)?.imageUrl
                }
              >
                {thereIsSomeOneOnline(users, selectedRoom) ? (
                  <AvatarBadge boxSize="0.8em" bg="#5CB85C" borderColor="#2E3035"/>
                ) : (
                  <AvatarBadge boxSize="0.8em" bg="#FF4136" borderColor="#2E3035" />
                )}
              </Avatar>
              <Text ml="7px">{selectedRoom.name}</Text>
            </Box>
            <ChatSettings />
          </Box>
          <Box
            width="100%"
            height="calc(100% - 60px)"
            display={"flex"}
            bg="#2B2D31"
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
              bgColor="#2E3035"
              border="3px solid #2E3035"
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
                            color="#A9AAAE"
                            fontWeight="bold"
                            pt="20px"
                            pr="30px"
                          >
                            <Box display="flex" alignItems="center">
                              <Text
                                fontSize="15px"
                                fontWeight="bolder"
                                color="white"
                              >
                                {getUserName(msg.userId)}
                              </Text>
                              <Text fontSize="12px" color="gray.400" ml="3px">
                                {isMember(msg.userId) ? "" : "(ExMember)"}
                              </Text>
                              <Text pl="7px" fontSize="15px">{msg.createdAt}</Text>
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
                  color='#E0E1E5'
              >
                <Input
                  fontFamily={"Inter"}
                  pl="60px"
                  fontWeight="bolder"
                  width="99%"
                  bg="#383A40"
                  isDisabled={isMuted()}
                  height="40px"
                  minHeight="50px"
                  m="10px"
                  value={msg}
                  focusBorderColor="#383A40"
                  borderColor="#383A40"
                  placeholder="Type a message"
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
                  icon={<BsFillEmojiSunglassesFill size="25px" color="#B8B9BF" />}
                  />
                </InputLeftElement>
                <InputRightElement mr={"20px"} height="100%">
                  <IconButton
                    isDisabled={isMuted()}
                    variant={"unstyled"}
                    aria-label="mic"
                    icon={<BsFillMicFill size="25px" color="#B8B9BF" />}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          height="90%"
          display="flex"
          color="#B8B9BF"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          fontSize={"50px"}
        >
          <Text fontSize="25px" mt="50px">
            Select a room to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
