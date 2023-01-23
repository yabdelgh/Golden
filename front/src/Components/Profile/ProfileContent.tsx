import { Box, calc } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import FriendsList from "../Friends/FriendsList";
import ProfilecontentBox from "./ProfilecontentBox";
import ProfileGraph from "./ProfileGraph";
import ProfileHistory from "./ProfileHistory";

const ProfileContent = () => {
  const { isSmallerThan1200, isSmallerThan1800 } = AppState()
  
  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      justifyContent="space-between"
      height={"fit-content"}
      ml={{ base: '305px', md: '435px' }}
     // width='fit-content'
    //  width={{base: 'calc(100% - 450px)', md:'100%'} }
    >
      <ProfilecontentBox>
      <ProfileGraph/>
      </ProfilecontentBox>
      <ProfilecontentBox>
        <ProfileHistory />
      </ProfilecontentBox>
      <ProfilecontentBox>
        <FriendsList />
      </ProfilecontentBox>
    </Box>
  );
};

export default ProfileContent;
