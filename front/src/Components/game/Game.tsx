import { Box } from "@chakra-ui/react";
import { Engine, Render, Vector } from "matter-js";
import React, { useEffect, useRef, useState } from "react";
import { AppState } from "../../Context/AppProvider";
import PlayerProfile from "../PlayerProfile";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.fillStyle = "white";
    const drawRect = async (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      ctx.fillRect(x, y, width, height);
    };
    const drawCircle = async (x: number, y: number, radius: number) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    async function render() {
      drawCircle(ball.x, ball.y, ball.radius);
      drawRect(player1.x - 2, player1.y, PLAYER_WIDTH, PLAYER_HEIGHT);
      drawRect(player2.x + 1, player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    const game = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      render();
    };

    document.onkeydown = (event) => {
      if (event.key === "ArrowUp") {
        player1.y -= 10;
      } else if (event.key === "ArrowDown") {
        player1.y += 10;
      }
    };
    setInterval(game, 1000 / FPS);
  }, []);

  const { socket } = AppState();
  const [data, setData] = useState();
  const [engine, setEngine]:any = useState();
  const [render, setRender]:any = useState();

  useEffect(() => {
    socket.on("data", setData(data));
    return () => {
      socket.removeAllListeners("data");
    };
  }, []);

  useEffect(() => {

    console.log("engine or render", engine, render)
    let constEngine
    let constRender
    if (!engine){
      constEngine = Engine.create({
      enableSleeping: false,
      gravity: Vector.create(0, 0),
      velocityIterations: 100,
      positionIterations: 100,
    });
    setEngine(constEngine);
    console.log("engine " ,constEngine)
  }
    if (!render) {
        constRender = Render.create({
        element: divRef.current,
        engine: constEngine as Engine,
        options: {
          width: 500,
          height: 600,
          // showStats: true,
          // showPerformance: true,
          background: "black",
          wireframes: true,
          // showAngleIndicator:true,
        },
      });
      Render.run(render);
      setRender(constRender)
    }
    console.log("userEffect")

    // render.canvas.style.transform = "scale(2,2)";
    // render.bounds.min.x = 10;


    // setInterval(() => { Body.setVelocity(ball, Vector.create(Math.sign(ball.velocity.x) * 5, ball.velocity.y)); console.log(ball.velocity)}, 100)
    // document.addEventListener("keydown", (e) => {
    //   if (e.code === KeyboardCodes.ArrowUp) player.start_moving(PlayerMove.Up);
    //   if (e.code === KeyboardCodes.ArrowDown)
    //     player.start_moving(PlayerMove.Down);
    // });

    // document.addEventListener("keyup", (e) => {
    //   if (
    //     e.code === KeyboardCodes.ArrowUp ||
    //     e.code === KeyboardCodes.ArrowDown
    //   )
    //     player.stop_moving();
    // });

    return () => {
      // Render.stop(render);
      //   render.clear(engine);
    };
  });

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
