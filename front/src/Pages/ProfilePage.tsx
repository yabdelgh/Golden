import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import AppHeader from "../Components/AppHeader";
import FriendsList from "../Components/Friends/FriendsList";
import CreateAGame from "../Components/game/CreateAGame";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileHistory from "../Components/Profile/ProfileHistory";
import {
  GiEvilWings,
  GiLibertyWing,
  GiAngelWings,
  GiFairyWings,
} from "react-icons/gi";
function PlayerLevel(props: any) {
  return (
    <Box display="flex" height="fit-content" width="fit-content" m="50px 70px">
      {/* <SiStarship size="200px" color="gold" /> */}
      <GiAngelWings size="200px" color="white" />
      <GiEvilWings size="200px" color="gold" />
      <GiFairyWings size="200px" color="silver" />
      <GiLibertyWing size="200px" color="#b9f2ff" />
    </Box>
  );
}

const ProfilePage = () => {
  const [boxName, setBoxName] = useState("Friend List");
  return (
    <Box
      width="100%"
      display="flex"
      height="100vh"
      position="fixed"
      top="0"
      left="70px"
    >
      <ProfileBar boxName={boxName} setBoxName={setBoxName} />
      <Box width="calc(100% - 390px)">
        <AppHeader />
        {boxName === "Friend List" ? (
          <FriendsList />
        ) : boxName === "Match History" ? (
          <ProfileHistory />
        ) : (
          <Box
            m="30px"
            // className="debug"
            // display="flex"
            // flexDir="column"
            height="90%"
            // alignItems="center"
            // justifyContent="center"
          >
            <PlayerLevel level="20" />
            <CreateAGame />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
