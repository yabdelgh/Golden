import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ChatHeader from "../Components/AppHeader";
import FriendsList from "../Components/Friends/FriendsList";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileHistory from "../Components/Profile/ProfileHistory";

const ProfilePage = () => {
  const [boxName, setBoxName] = useState("Friend List");
  return (
    <Box
      width="100%"
      display='flex'
      height="100vh"
    >
      
      <ProfileBar boxName={boxName} setBoxName={setBoxName} />
      <Box width="calc(100% - 320px)">
        <ChatHeader />
        { boxName ==="Friend List" ?
          <FriendsList /> :
          <ProfileHistory /> }
      </Box>
    </Box>
  );
};

export default ProfilePage;
