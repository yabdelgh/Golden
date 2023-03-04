import { Box } from "@chakra-ui/react";
import { useState } from "react";
import AppHeader from "../Components/AppHeader";
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
      position="fixed"
      top="0"
      left="70px"
    >
      
      <ProfileBar boxName={boxName} setBoxName={setBoxName} />
      <Box width="calc(100% - 390px)">
        <AppHeader />
        { boxName ==="Friend List" ?
          <FriendsList /> :
          <ProfileHistory /> }
      </Box>
    </Box>
  );
};

export default ProfilePage;
