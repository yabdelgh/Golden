// import "../App.css";
// import { useEffect, useState } from "react";
// import { AppState } from "../Context/AppProvider";
// import { GameBodies, GameData, GameState } from "../../types";
// import { useParams } from 'react-router-dom';
// import { removeNulls } from "../Utils/cleanObject";
// import { Body, Composite, Engine, Events, Render, Vector } from "matter-js";
// import React from "react";
// import PriorityQueue from "ts-priority-queue";
// import PlayerScore from "../Components/game/PlayerScore";
// import { Box } from "@chakra-ui/react";
// import WinnerModal from "../Components/game/WinnerModal";


// const gameDataqueue = new PriorityQueue<GameState>({
//   comparator: function (a, b) {
//     return a.id - b.id;
//   },
// });
// let FrameId = 0;

// const LiveGamePage = () => {
//   const { gameId } = useParams();
//   let divRef: any = React.createRef();

//   const [ isWinnerOpen , setisWinnerOpen ] = useState<boolean>(false);
//   const [ winner , setWinner ] = useState<{login: string, image: string|null}>({login: '', image: null});

//   const { socket } = AppState();
//   const [engine, setEngine]: any = useState();
//   const [render, setRender]: any = useState();
//   const [gameState, setGameState] = useState<GameBodies>();
//   const [ avatar1, setAvatar1 ] = useState<string|null>(null);
//   const [ avatar2, setAvatar2 ] = useState<string|null>(null);
//   const [ name1, setName1 ] = useState<string|null>(null);
//   const [ name2, setName2 ] = useState<string|null>(null);
//   const [ score1, setScore1 ] = useState<number>(0);
//   const [ score2, setScore2 ] = useState<number>(0);

//   useEffect(() => {
//     if (gameState) {
//       Events.on(render, "beforeRender", () => {
//         if (FrameId === 0 && gameDataqueue.length > 0)
//           FrameId = gameDataqueue.peek().id
//         if (gameDataqueue.length > 0 && FrameId == gameDataqueue.peek().id) {
//           FrameId++;
//           const data = gameDataqueue.dequeue();
//           setScore1(data.score[1]);
//           setScore2(data.score[0]);
//           Body.setPosition(gameState.ball, data.ball);
//           Body.setPosition(gameState.players[0], data.players[0]);
//           Body.setPosition(gameState.players[1], data.players[1]);
//         }
//       });
//       socket.on("gameDataUpdate", (data: GameState) => {
//         if (FrameId <= data.id)
//           gameDataqueue.queue(data);
//       });
//     }
//     return () => {
//       socket&&socket.removeAllListeners("gameDataUpdate");
//     };
//   }, [gameState, socket, render]);

//   useEffect(() => {
//     if (render) {
//       socket.on("gameData", (serialized: any) => {
//         const data: GameData = JSON.parse(serialized);
//         const user1 = data.usersOfPlayers[0];
//         const user2 = data.usersOfPlayers[1];
//         setName1(user1.login);
//         setName2(user2.login);
//         setAvatar1(user1.imageUrl);
//         setAvatar2(user2.imageUrl);
//         const players = data.players.map((p) => {
//           const clearP = removeNulls(p)
//           if (clearP.parts.length > 0)
//             clearP.parts =  (clearP.parts as Body[]).map(part => Body.create(part))
//           return Body.create(clearP)
//       });
//         const obstacles = data.obstacles.map((o) =>
//           Body.create(removeNulls(o))
//         );
//         const ball = Body.create(removeNulls(data.ball));
//         engine && Composite.add(engine.world, [...players, ...obstacles, ball]);
//         setGameState({ players, obstacles, ball });
//       });
//       socket.emit("getGameData", gameId);
//       socket.on("gameOver", (winner: {login: string, image: string | null}) => {
//         setWinner(winner);
//         setisWinnerOpen(true);
//       });
//     } else {
//     }

//     return () => {
//       socket&&socket.removeAllListeners("data");
//     };
//   }, [render]);

//   useEffect(() => {
//     let constEngine;
//     let constRender;
//     if (!engine) {
//       constEngine = Engine.create({
//         enableSleeping: false,
//         gravity: Vector.create(0, 0),
//       });
//       setEngine(constEngine);
//     }
//     if (!render) {
//       constRender = Render.create({
//         element: divRef.current,
//         engine: constEngine as Engine,
//         options: {
//           width: 1000,
//           height: 500,
//           background: "black",
//           wireframes: false,
//         },
//       });
//       setRender(constRender);
//       Render.run(constRender);
//     }

//     return () => {
//       // Render.stop(render);
//       // render.clear(engine);
//     };
//   }, []);

//   return (
//     <>
//     <Box 
//       width="80%"
//       height="100px"
//       display="flex"
//       flexDirection="row"
//       justifyContent="space-between"
//       alignItems="center"
//       position="absolute"
//       top="100px"
//       left="50%"
//       transform="translateX(-50%)"
//     >
//       <PlayerScore
//         name={name1}
//         image={avatar1 || "/defaultProfilePic.png"}
//         score={score1}
//         isLeft={true}
//       />
//       <Box w="1px" h="60px" bgColor="gray.600" m="0 5px"/>
//       <PlayerScore
//         name={name2}
//         image={avatar2 || "/defaultProfilePic.png"}
//         score={score2}
//         isLeft={false}
//       />
//     </Box>
//     <div className="canvas-container" style={{marginTop: "300px"}}>
//       <div id="render" className="matter-canvas" ref={divRef} />
//     </div>
//     {/* <WinnerModal winner={winner} isOpen={isWinnerOpen}/> */}
//     </>
//   );
// };

// export default LiveGamePage;

import { Box } from "@chakra-ui/react";
import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Render,
  Runner,
  Vector,
  Events,
} from "matter-js";
import React, { useEffect, useRef, useState } from "react";
import {
  GameData,
  GameState,
  GameBodies,
  SocketGamePlayerMoveData,
  User,
} from "../../types";
import { AppState } from "../Context/AppProvider";
import _ from "lodash";
import { removeNulls } from "../Utils/cleanObject";
import KeyboardCodes from "../Utils/KeyboardCodes";
import { MoveStat, PlayerMove } from "../Utils/enums";
import { Player } from "../GameCore/Players/player";
// import PlayerScore from "Component/PlayerScore";
import PriorityQueue from "ts-priority-queue";
import PlayerScore from "../Components/game/PlayerScore";
import WinnerModal from "../Components/game/WinnerModal";
import { useParams } from "react-router-dom";
// import WinnerModal from "./WinnerModal";

const gameDataqueue = new PriorityQueue<GameState>({
  comparator: function (a, b) {
    return a.id - b.id;
  },
});
let FrameId = 0;
const LiveGamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let divRef: any = React.createRef();
  const { gameId } = useParams();

  const { user, users, setUser } = AppState();
  const [isWinnerOpen, setisWinnerOpen] = useState<boolean>(false);
  const [isCountDownOpen, setIsCountDownOpen] = useState<boolean>(true);
  const [winner, setWinner] = useState<{ login: string; image: string | null }>(
    { login: "", image: null }
  );
  // let engine:Engine
  // let render:Render
  
  const { socket } = AppState();
  const [engine, setEngine]: any = useState();
  const [render, setRender]: any = useState();
  const [gameState, setGameState] = useState<GameBodies>();
  const [ avatar1, setAvatar1 ] = useState<string|null>(null);
  const [ avatar2, setAvatar2 ] = useState<string|null>(null);
  const [ name1, setName1 ] = useState<string|null>(null);
  const [ name2, setName2 ] = useState<string|null>(null);
  const [ score1, setScore1 ] = useState<number>(0);
  const [ score2, setScore2 ] = useState<number>(0);
  const [ width, setWidth ] = useState<number>(window.innerWidth);
  const [ height, setHeight ] = useState<number>(window.innerHeight);
  
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);


  useEffect(() => {
    if (render && engine) {
      let scaleFactor = window.innerHeight * 0.6/500;
      if (window.innerWidth < 2 * window.innerHeight) {
        scaleFactor = window.innerWidth * 0.7/1000;
      }
      render.canvas.style.transform = `scale(${scaleFactor},${scaleFactor})`;
    }
  }, [width, height]);

  useEffect(() => {
    if (gameState) {
      Events.on(render, "beforeRender", () => {
        if (FrameId == 0 && gameDataqueue.length > 0)
          FrameId = gameDataqueue.peek().id;
        if (gameDataqueue.length > 0 && FrameId == gameDataqueue.peek().id) {
          FrameId++;
          const data = gameDataqueue.dequeue();
          setScore1(data.score[0]);
          setScore2(data.score[1]);
          Body.setPosition(gameState.ball, data.ball);
          Body.setPosition(gameState.players[0], data.players[0]);
          Body.setPosition(gameState.players[1], data.players[1]);
        }
      });
      socket.on("gameDataUpdate", (data: GameState) => {
        if (FrameId <= data.id) gameDataqueue.queue(data);
      });
    }
    return () => {
      if(socket)
        socket.removeAllListeners("gameDataUpdate");
      gameDataqueue.clear();
      FrameId = 0;
    };
  }, [gameState]);

  useEffect(() => {
    if (render) {
      socket.on("gameData", (serialized: any) => {
        const data: GameData = JSON.parse(serialized);
        const user1 = data.usersOfPlayers[0];
        const user2 = data.usersOfPlayers[1];
        setName1(user1.login);
        setName2(user2.login);
        setAvatar1(user1.imageUrl);
        setAvatar2(user2.imageUrl);
        const players = data.players.map((p) => {
          const clearP = removeNulls(p);
          if (clearP.parts.length > 0)
            clearP.parts =  (clearP.parts as Body[]).map(part => Body.create(part))
          return Body.create(clearP)
      });
        const obstacles = data.obstacles.map((o) => {
          const clearP = removeNulls(o)
          if (clearP.parts.length > 0)
            clearP.parts =  (clearP.parts as Body[]).map(part => Body.create(part))
          return Body.create(clearP)
        }
        );
        const ball = Body.create(removeNulls(data.ball));
        engine && Composite.add(engine.world, [...players, ...obstacles, ball]);
        setGameState({ players, obstacles, ball });
      });
      socket.emit("getGameData", gameId);
      socket.on("gameOver", (winner: {login: string, image: string | null}) => {
        setWinner(winner);
        setisWinnerOpen(true);
      });
    } else {
    }

    return () => {
      if(socket)
        socket.removeAllListeners("data");
    };
  }, [render]);

  useEffect(() => {
    let constEngine;
    let constRender;
    if (!engine) {
      constEngine = Engine.create({
        enableSleeping: false,
        gravity: Vector.create(0, 0),
      });
      setEngine(constEngine);
    }
    if (!render) {
      constRender = Render.create({
        element: divRef.current,
        engine: constEngine as Engine,
        options: {
          width: 1000,
          height: 500,
          background: "black",
          wireframes: false,
          // showDebug:true,
          // showAxes:true,
        },
      });
      let scaleFactor = window.innerHeight * 0.6/500;
      if (window.innerWidth < 2 * window.innerHeight) {
        scaleFactor = window.innerWidth * 0.7/1000;
      }
      constRender.canvas.style.transform = `scale(${scaleFactor},${scaleFactor})`;
      constRender.canvas.style.transformOrigin = "top center";
      setRender(constRender);
      Render.run(constRender);
  }
    return () => {
      if (render) {
        Render.stop(render)
        Engine.clear(engine)
        setRender(undefined);
        setEngine(undefined);
      }
    };
  }, [render]);

  return (
    <Box
      width="80%"
      m="100px auto 0 auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
    <Box 
      width="85%"
      height="100px"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <PlayerScore
        name={name1}
        image={avatar1 || "/defaultProfilePic.png"}
        score={score1}
        isLeft={true}
      />
      <Box w="1px" h="60px" bgColor="gray.600" m="0 5px"/>
      <PlayerScore
        name={name2}
        image={avatar2 || "/defaultProfilePic.png"}
        score={score2}
        isLeft={false}
      />
    </Box>
    <div id="render" ref={divRef} style={{marginTop: "50px"}} />
    <WinnerModal winner={winner} isOpen={isWinnerOpen}/>
    </Box>
  );
};

export default LiveGamePage;
