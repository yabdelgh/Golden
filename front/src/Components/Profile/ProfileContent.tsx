import { Box, calc } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppState } from "../../Context/AppProvider";
import FriendsList from "../Friends/FriendsList";
import ProfilecontentBox from "./ProfilecontentBox";
import ProfileGraph from "./ProfileGraph";
import ProfileHistory from "./ProfileHistory";

const ProfileContent = () => {
  const { userProfile } = AppState();
  const [overview, setOverview] = useState({ Wins: 0, Games: 0 });

  useEffect(() => {
    if (userProfile.id)
      axios.get(`/api/game/overview/${userProfile.id}`).then(({ data }) => {
        setOverview(data);
      });
  }, [userProfile, overview]);

  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      justifyContent="space-between"
      height={"fit-content"}
      ml={{ base: "305px", md: "435px" }}
    >
      <ProfilecontentBox>
        <ProfileGraph wins={overview?.Wins} games={overview?.Games} />
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
