import "../App.css";
import { useState } from "react";
import CreateAGame from "../Components/game/CreateAGame";
import ChallengeTogame from "../Components/game/ChallengeTogame";
import { AppState } from "../Context/AppProvider";
import Game from "../Components/game/Game";
import WaitAGame from "../Components/game/WaitAGame";
import { User } from "../../types";
import { validateHeaderValue } from "http";

const GamePage = () => {
  const { user, setUser, socket} = AppState();
  const [map, setMap] = useState("default");
  const [invit, setInvit] = useState(false);
  const [opponent, setOpponent]: any = useState({});
  const [opponentType, setOpponentType] = useState("quick pairing");

  const send = () => {

    if (opponentType === 'Friend')
      socket.emit("challenge", {
        challengedId: opponent.id,
        map: map,
      });
    else { 
      setUser((value: User) => ({...value, WaitingAGame: true}));
      socket.emit('quickPairing');
    }
  };

  return (
    <>
      {user.inGame ? <Game/> : user.WaitingAGame ? <WaitAGame/> : !invit ? (
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
