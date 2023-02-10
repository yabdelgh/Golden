import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ChatBox from "../Components/chat/ChatBox";
import ChatList from "../Components/chat/ChatList";
import { AppState } from "../Context/AppProvider";

const ChatPage = () => {
  return (
    <Box
      width="100%"
      display="flex"
      m="70px 0px 10px 80px"
      height="calc(100vh - 80px)"
      p="0px 5px 0px 5px"
    >
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
