import { Box } from "@chakra-ui/react";
import FriendsList from "../Components/Friends/FriendsList";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileGraph from "../Components/Profile/ProfileGraph";
import ProfileHistory from "../Components/Profile/ProfileHistory";

const ProfilePage = () => {
  return (
    <Box
      width={"100%"}
      display="grid"
      // classNamdde="debug"
      gridTemplateColumns={{ base: "1fr", xl: "1fr 1fr" }}
      alignItems="stretch"
      gridAutoRows="minmax(400px, auto)"
      gap="2px"
      p="2px"
    >
      <ProfileBar />
      <ProfileHistory />
      <FriendsList />
      <ProfileGraph />
    </Box>
  );
};

export default ProfilePage;
