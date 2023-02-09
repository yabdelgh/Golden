import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/ChatBox";
import ChatList from "../Components/ChatList";
import UsersList from "../Components/UsersList";
import UserProfile from "../Components/UserProfile";
import { AppState } from "../Context/AppProvider";
import NavBar from "../Components/NavBar/NavBar";

const ChatPage = () => {


  return (
    <Box width="100%" display="flex" m="70px 0px 0px 72px">
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
