import "../App.css";
import { useState } from "react";
import CreateAGame from "../Components/game/CreateAGame";
import ChallengeTogame from "../Components/game/ChallengeTogame";
import { AppState } from "../Context/AppProvider";
import Game from "../Components/game/Game";
import WaitAGame from "../Components/game/WaitAGame";
import { User } from "../../types";

const GamePage = () => {
  const { user, setUser, socket} = AppState();
  const [map, setMap] = useState("Simple");
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
      socket.emit('quickPairing', {map: map});
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