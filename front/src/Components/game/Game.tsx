import { Box } from "@chakra-ui/react";
import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Render,
  Runner,
  Vector,
  Events
} from "matter-js";
import React, { useEffect, useRef, useState } from "react";
import { GameData, GameState, GameBodies } from "../../../types";
import { AppState } from "../../Context/AppProvider";
import _ from "lodash";
import { removeNulls } from "../../Utils/cleanObject";
import KeyboardCodes from "../../Utils/KeyboardCodes";
import { MoveStat, PlayerMove } from "../../Utils/enums";
import { Player } from "../../GameCore/Players/player";

const FPS = 60;
const PLAYER_WIDTH = 12;
const PLAYER_HEIGHT = 70;
const BALL_RADIUS = 7;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

const player1 = {
  x: 0,
  y: (CANVAS_HEIGHT - PLAYER_HEIGHT) / 2,
};

const player2 = {
  x: CANVAS_WIDTH - PLAYER_WIDTH,
  y: (CANVAS_HEIGHT - PLAYER_HEIGHT) / 2,
};

const ball = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
  radius: BALL_RADIUS,
  velocityX: 3.5,
  velocityY: 2.5,
};

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let divRef: any = React.createRef();

  const { user, users } = AppState();

  // let engine:Engine
  // let render:Render

  const { socket } = AppState();
  const [engine, setEngine]: any = useState();
  const [render, setRender]: any = useState();
  const [gameState, setGameState] = useState<GameBodies>();

  useEffect(() => {
    if (gameState) {
      socket.on("gameDataUpdate", (data: GameState) => {
        console.log(data);
        Body.setPosition(gameState.ball, data.ball);
        Body.setVelocity(gameState.ball, data.ball_velocity);
        Body.setPosition(gameState.players[0],data.player1);
        Body.setPosition(gameState.players[1],data.player2);
        Events.on(engine, "afterUpdate", (event) => { 
          gameState.gamePlayer[0].update_game_state({} as GameState)
          gameState.gamePlayer[1].update_game_state({} as GameState)
        })
      });
    }
    return () => {
      socket.removeAllListeners("gameDataUpdate", render);
    };
  }, [gameState]);

  useEffect(() => {
    if (render) {
      socket.on("gameData", (serialized: any) => {
        const data: GameData = eval(`(${serialized})`);
        const players = data.players.map((p) => Body.create(removeNulls(p)));
        const obstacles = data.obstacles.map((o) =>
          Body.create(removeNulls(o))
        );
        const ball = Body.create(removeNulls(data.ball));
        const gamePlayers: Player[] = players.map(b => new Player(b, 0))

        // Body.setVelocity(ball, Vector.create(0, 0));
        engine && Composite.add(engine.world, [...players, ...obstacles, ball]);
        setGameState({ players, obstacles, ball });
      });
      socket.emit("getGameData", {});
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
        velocityIterations: 100,
        positionIterations: 100,
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
          // showStats: true,
          // showPerformance: true,
          background: "black",
          wireframes: false,
          // showAngleIndicator:true,
        },
      });
      setRender(constRender);
      Render.run(constRender);
      Runner.start(Runner.create(), constEngine as Engine);
    }

    // render.canvas.style.transform = "scale(2,2)";
    // render.bounds.min.x = 10;

    // setInterval(() => { Body.setVelocity(ball, Vector.create(Math.sign(ball.velocity.x) * 5, ball.velocity.y)); console.log(ball.velocity)}, 100)
    document.addEventListener("keydown", (e) => {
      if (e.code === KeyboardCodes.ArrowUp) 
        socket.emit("gamePlayerMove", {direction:PlayerMove.Up, action:MoveStat.Start});
      if (e.code === KeyboardCodes.ArrowDown)
      socket.emit("gamePlayerMove", {direction:PlayerMove.Down, action:MoveStat.Start});
    });

    document.addEventListener("keyup", (e) => {
      if (
        e.code === KeyboardCodes.ArrowUp ||
        e.code === KeyboardCodes.ArrowDown
      )
      socket.emit("gamePlayerMove", { action:MoveStat.Stop});
    });

    return () => {
      // Render.stop(render);
      //   render.clear(engine);
    };
  }, []);

  return <div id="render" ref={divRef} />;

  // return (
  //   <Box m="10%" display="flex">
  //     {user && <PlayerProfile target={user} color="#013BB7" />}
  //     <Box height="fit-content" ml="10px" mr="10px">
  //       <canvas

  //         id="ping-pong"
  //         width="700"
  //         height="500"
  //         ref={canvasRef}
  //       ></canvas>
  //     </Box>
  //     {users && <PlayerProfile target={users[0]} color="#df0225" />}
  //   </Box>
  // );
};

export default Game;
