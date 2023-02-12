import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ChatBox from "../Components/chat/ChatBox";
import ChatList from "../Components/chat/ChatList";
import { AppState } from "../Context/AppProvider";

const ChatPage = () => {
  return (
    <Box width="100%" display="flex" m="0px" height="calc(100vh - 80px)">
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
