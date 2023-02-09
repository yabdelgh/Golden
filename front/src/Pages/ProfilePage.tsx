import { Box } from "@chakra-ui/react";
import FriendsList from "../Components/Friends/FriendsList";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileGraph from "../Components/Profile/ProfileGraph";
import ProfileHistory from "../Components/Profile/ProfileHistory";

const ProfilePage = () => {
  return (
    <Box
      display='flex'
      flexWrap='wrap'
      justifyContent='space-around'
      alignItems='space-around'
      width={'calc(100% - 70px)'}
      m='70px 10px 0 80px'
    >
      <ProfileBar />
      <ProfileHistory />
      <FriendsList />
      <ProfileGraph />
    </Box>
  );
};

export default ProfilePage;

