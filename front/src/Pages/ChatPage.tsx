import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/ChatBox";
import ChatList from "../Components/ChatList";
import UsersList from "../Components/UsersList";
import RightEle from "../Components/RightEle";
import UserProfile from "../Components/UserProfile";
import { AppState } from "../Context/AppProvider";
import NavBar from "../Components/NavBar/NavBar";

const ChatPage = () => {
  const { showUP, usersList } = AppState();

  return (
    <Box
      width="100%"
      display="flex"
      m='70px 0px 0px 72px'
    >
      <ChatList />
      <ChatBox />
      <RightEle>
        {showUP ? <UserProfile /> : usersList ? <UsersList /> : undefined}
      </RightEle>
    </Box>
  );
};

export default ChatPage;
