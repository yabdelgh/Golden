import { Box } from "@chakra-ui/react";
import { useState } from "react";
import AppHeader from "../Components/AppHeader";
import FriendsList from "../Components/Friends/FriendsList";
import CreateAGame from "../Components/game/CreateAGame";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileHistory from "../Components/Profile/ProfileHistory";
import {
  GiEvilWings,
  GiLibertyWing,
  GiWingedSword,
  GiFairyWings,
} from "react-icons/gi";

import { Progress } from "@chakra-ui/react";

const levels = [
  { name: "Noob", icon: "noob-icon" },
  { name: "Silver", icon: "silver-icon" },
  { name: "Gold", icon: "gold-icon" },
  { name: "Legend", icon: "legend-icon" },
];

function ProgressBar({ level }: any) {
  const value = (levels.findIndex((l) => l.name === level) + 1) * 25;
  return (
    <Box
      position="relative"
      // border="3px solid red"
      display="flex"
      height="90px"
      alignItems="flex-end"
      pb="20px"
      bg="#36373D"
      width="90%"
      borderRadius="15px"
      justifyContent="center"
    >
      {levels.map((l) => (
        <Box
          key={l.name}
          className={l.icon}
          position="absolute"
          top="-20px"
          left={`${
            (levels.findIndex((i) => i.name === l.name) + 1) * 25 - 12.5
          }%`}
        />
      ))}
      <Box position="relative" width="90%">
        <Progress
          value={value}
          size="sm"
          width="100%"
          height="8px"
          colorScheme="green"
          bg="gray"
          borderRadius="full"
        />
        <Box
          className="special-icon"
          position="absolute"
          top="-40px"
          left={`50%`}
        >
          <GiEvilWings size="30px" color="gold" />
        </Box>
        <Box
          className="special-icon"
          position="absolute"
          top="-40px"
          left="96%"
        >
          <GiWingedSword size="30px" color="white" />
        </Box>
        <Box
          className="special-icon"
          position="absolute"
          top="-40px"
          left="25%"
        >
          <GiLibertyWing size="30px" color="silver" />
        </Box>
        <Box className="special-icon" position="absolute" top="-40px" left="0%">
          <GiFairyWings size="30px" color="white" />
        </Box>
      </Box>
    </Box>
  );
}

function PlayerLevel(props: any) {
  return (
    <Box
      display="flex"
      height="fit-content"
      // width="fit-content"
      m="60px 70px"
      // border="3px solid red"
      width="90%"
    >
      {/* <GiWingedSword size="200px" color="#EFFFFE" /> */}
      <GiEvilWings size="200px" color="gold" />
      {/* <GiFairyWings size="200px" color="white" /> */}
      {/* <GiWingedEmblem size="200px" color="silver" /> */}
    </Box>
  );
}

const ProfilePage = () => {
  const [boxName, setBoxName] = useState("Home");
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
      <Box width="calc(100% - 390px)" minW="600px">
        <AppHeader />
        {boxName === "Friend List" ? (
          <FriendsList />
        ) : boxName === "Match History" ? (
          <ProfileHistory />
        ) : (
          <Box
            m="30px"
            // className="debug"
            display="flex"
            flexDir="column"
            height="90%"
            alignItems="center"
            // justifyContent="center"
          >
            <PlayerLevel level="20" />
            <ProgressBar level="Gold" />
            <CreateAGame />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
