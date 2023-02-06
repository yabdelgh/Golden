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
import PriorityQueue from "ts-priority-queue";

const gameDataqueue = new PriorityQueue<GameState>({ comparator: function(a, b) { return a.id - b.id; }})
let FrameId = 0;
let show = true
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
      Events.on(render, "beforeRender", () => {
        if (gameDataqueue.length > 0 && FrameId == gameDataqueue.peek().id) {
          FrameId++;
        const data = gameDataqueue.dequeue();
        Body.setPosition(gameState.ball, data.ball);
        Body.setPosition(gameState.players[0], data.players[0]);
        Body.setPosition(gameState.players[1], data.players[1]);
        }
      })
      socket.on("gameDataUpdate", (data: GameState) => {
        gameDataqueue.queue(data);
      });
    }
    return () => {
      socket.removeAllListeners("gameDataUpdate");
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
        socket.emit("gamePlayerMove", {direction: PlayerMove.Up, action: MoveStat.Start});
      else if (e.code === KeyboardCodes.ArrowDown)
        socket.emit("gamePlayerMove", {direction: PlayerMove.Down, action: MoveStat.Start});
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
    <div className="canvas-container">
      <div id="render" className="matter-canvas" ref={divRef} />
    </div> 
  )
};

export default Game;
