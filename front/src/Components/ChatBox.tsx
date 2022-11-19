import { HiUsers } from "react-icons/hi";
import { Avatar, AvatarBadge, Box, IconButton, Input } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Text } from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";
import ChatConfigModal from "./ChatConfigModal";
import { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import "./mystyle.module.css";
import { VscChromeClose } from "react-icons/vsc";
import { setConstantValue } from "typescript";

const ChatBox = () => {
  const {
    user,
    socket,
    users,
    setUsers,
    selectedRoom,
    setSelectedRoom,
    usersList,
    setUsersList,
    msgs,
  } = ChatState();
  const [msg, setMsg] = useState("");
  const sendMessage = () => {
    socket.emit("chatMsg", { roomId: selectedRoom.id, msg });
  };
  const getUserName = (id: number) => {
    const ret = users.find((user: any) => {
      return user.id === id;
    });
    if (!ret)
      return user.login;
    return ret.login;
  }
 // const props: any = useState({ forceScroll: true, className: "hamid" });
  return (
    <Box
      display={{
        base: selectedRoom && !usersList ? "flex" : "none",
        md: !usersList ? "flex" : "none",
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
                bg="#4267B2"
                color="white"
                borderRadius={"5px"}
                name={selectedRoom.name}
              >
                <AvatarBadge boxSize="0.9em" bg="#00FF00" />
              </Avatar>
              <Text ml="18px">{selectedRoom.name}</Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="120px"
              mr="15px"
              p="5px"
            >
              <ChatConfigModal>
                <IconButton
                  variant={"ghost"}
                  aria-label="Search database"
                  icon={<BsGear size="25px" />}
                />
              </ChatConfigModal>
              <IconButton
                variant={"ghost"}
                aria-label="Member List"
                onClick={() => setUsersList(!usersList)}
                icon={<HiUsers size="25px" />}
              />
              <IconButton
                aria-label="close"
                variant="ghost"
                icon={<VscChromeClose size="25px" />}
                onClick={() => {
                  setSelectedRoom(undefined);
                }}
              />
            </Box>
          </Box>
          <Box width='100%' height='82%' overflow={'scroll'} overflowX='hidden'>
            {msgs &&
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
                      <Box display="flex">
                        <Text fontSize="15px" fontWeight="bolder" color="black">
                          {getUserName(msg.userId)}
                        </Text>
                        <Text pl="10px">{msg.createdAt}</Text>
                      </Box>
                      {msg.msg}
                    </Box>
                  );
                return <></>;
              })}
          </Box>
            <Input
              fontFamily={"Inter"}
              fontWeight="bolder"
              bg="white"
              height="8%"
              minHeight="50px"
              width="98%"
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
              }}/>
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
