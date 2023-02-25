import { Box } from "@chakra-ui/react";
import ChatHeader from "../Components/AppHeader";
import FriendsList from "../Components/Friends/FriendsList";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileGraph from "../Components/Profile/ProfileGraph";
import ProfileHistory from "../Components/Profile/ProfileHistory";

const ProfilePage = () => {
  return (
    <Box
      width={"100%"}
      // display="grid"
      // gridTemplateColumns={{ base: "1fr", xl: "1fr 1fr" }}
      // alignItems="stretch"
      // gridAutoRows="minmax(400px, auto)"
      // gap="2px"
      display='flex'
    >
      
      <ProfileBar />
      <Box width="calc(100% - 300px)">
        <ChatHeader />
        {/* <ProfileHistory /> */}
        {/* <ProfileHistory />
        <FriendsList />
        <ProfileGraph /> */}
      </Box>
    </Box>
  );
};

export default ProfilePage;
