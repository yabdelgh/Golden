import { Box, Button, Text } from "@chakra-ui/react";
import ChatHeader from "../Components/ChatHeader";
import "../App.css";
import { useState } from "react";
import CreateAGame from "../Components/game/CreateAGame";
import ChallengeTogame from "../Components/game/ChallengeTogame";
import { Socket } from "socket.io-client";
import { AppState } from "../Context/AppProvider";

const GamePage = () => {
  const { socket } = AppState();
  const [map, setMap] = useState("default");
  const [invit, setInvit] = useState(false);
  const [opponent, setOpponent]: any = useState({});
  const [opponentType, setOpponentType] = useState("quick pairing");

  const send = () => {
    socket.emit("challenge", {
      challengedId: opponent.id,
      map: map,
    });
  };

  return (
    <>
      <ChatHeader />
      {!invit ? (
        <CreateAGame
          opponentType={opponentType}
          setOpenentType={setOpponentType}
          setInvit={setInvit}
          setMap={setMap}
          send={send}
        />
      ) : (
        <ChallengeTogame
          setInvit={setInvit}
          send={send}
          setMap={setMap}
          opponent={opponent}
          setOpponent={setOpponent}
          setOpenentType={setOpponentType}
        />
      )}
    </>
  );
};

export default GamePage;

{
  /* <Box
          m="10px"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent={"space-around"}
          height="600px"
          width="500px"
          border="3px solid white"
          borderRadius="lg"
        >
          <Box bg="white" width="90%" pl="120px" borderRadius="lg">
            <Text fontSize="40px">Challenges</Text>
          </Box>
          <Box
            height="470px"
            width="90%"
            border="3px solid white"
            bg="white"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent={"center"}
          >
            {challegens ? (
              challegens.map(() => <>hello</>)
            ) : (
              <Text fontFamily={"Inter"} fontSize="20px">
                No challegens
              </Text>
            )}
          </Box>
        </Box> */
}
