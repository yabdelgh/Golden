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
} from "../../../types";
import { AppState } from "../../Context/AppProvider";
import _ from "lodash";
import { removeNulls } from "../../Utils/cleanObject";
import KeyboardCodes from "../../Utils/KeyboardCodes";
import { MoveStat, PlayerMove } from "../../Utils/enums";
import { Player } from "../../GameCore/Players/player";
import PlayerScore from "./PlayerScore";
import PriorityQueue from "ts-priority-queue";
import WinnerModal from "./WinnerModal";
import CountDownModal from "./CountDownModal";

const gameDataqueue = new PriorityQueue<GameState>({
  comparator: function (a, b) {
    return a.id - b.id;
  },
});
let FrameId = 0;
let show = true;
const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let divRef: any = React.createRef();

  const { user, users } = AppState();
  const [ isWinnerOpen , setisWinnerOpen ] = useState<boolean>(false);
  const [ isCountDownOpen , setIsCountDownOpen ] = useState<boolean>(true);
  const [ winner , setWinner ] = useState<{login: string, image: string|null}>({login: '', image: null});
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

  useEffect(() => {
    if (gameState) {
      Events.on(render, "beforeRender", () => {
        if (FrameId == 0 && gameDataqueue.length > 0)
          FrameId = gameDataqueue.peek().id
        if (gameDataqueue.length > 0 && FrameId == gameDataqueue.peek().id) {
          FrameId++;
          const data = gameDataqueue.dequeue();
          setScore1(data.score[1]);
          setScore2(data.score[0]);
          Body.setPosition(gameState.ball, data.ball);
          Body.setPosition(gameState.players[0], data.players[0]);
          Body.setPosition(gameState.players[1], data.players[1]);
        }
      });
      socket.on("gameDataUpdate", (data: GameState) => {
        if (FrameId <= data.id)
          gameDataqueue.queue(data);
      });
    }
    return () => {
      socket.removeAllListeners("gameDataUpdate");
    };
  }, [gameState]);

  const countDownCallBack = () => {
    socket.emit("startGame", {});
  }

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
          const clearP = removeNulls(p)
          if (clearP.parts.length > 0)
            clearP.parts =  (clearP.parts as Body[]).map(part => Body.create(part))
          return Body.create(clearP)
      });
        const obstacles = data.obstacles.map((o) =>
          Body.create(removeNulls(o))
        );
        const ball = Body.create(removeNulls(data.ball));
        engine && Composite.add(engine.world, [...players, ...obstacles, ball]);
        setGameState({ players, obstacles, ball });
      });
      socket.emit("getGameData", {});
      socket.on("gameOver", (winner: {login: string, image: string | null}) => {
        setWinner(winner);
        setisWinnerOpen(true);
      });
      socket.on("gameStarted", () => {
        setIsCountDownOpen(false);
      });
    } else {
      console.log("game data not received");
    }

    return () => {
      socket.removeAllListeners("data", render);
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
      console.log("engine ", constEngine);
    }
    if (!render) {
      constRender = Render.create({
        element: divRef.current,
        engine: constEngine as Engine,
        options: {
          width: 500,
          height: 500,
          background: "black",
          wireframes: false,
        },
      });
      setRender(constRender);
      Render.run(constRender);
    }

    // render.canvas.style.transform = "scale(2,2)";
    // render.bounds.min.x = 10;

    document.addEventListener("keydown", (e) => {
      if(e.repeat)
        return
      if (e.code === KeyboardCodes.ArrowUp)
        socket.emit("gamePlayerMove", {
          direction: PlayerMove.Up,
          action: MoveStat.Start,
        });
      else if (e.code === KeyboardCodes.ArrowDown)
        socket.emit("gamePlayerMove", {
          direction: PlayerMove.Down,
          action: MoveStat.Start,
        });
    });

    document.addEventListener("keyup", (e) => {
      if (
        e.code === KeyboardCodes.ArrowUp ||
        e.code === KeyboardCodes.ArrowDown
      )
        socket.emit("gamePlayerMove", { action: MoveStat.Stop });
    });

    return () => {
      Render.stop(render);
      render.clear(engine);
    };
  }, []);

  return (
    <>
    <Box 
      width="80%"
      height="100px"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
      top="100px"
      left="50%"
      transform="translateX(-50%)"
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
    <div className="canvas-container" style={{marginTop: "300px"}}>
      <div id="render" className="matter-canvas" ref={divRef} />
    </div>
    <CountDownModal isOpen={isCountDownOpen}  callback={countDownCallBack}/>
    <WinnerModal winner={winner} isOpen={isWinnerOpen}/>
    </>
  );
};

export default Game;
