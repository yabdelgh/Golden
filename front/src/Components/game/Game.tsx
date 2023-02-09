import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AppState } from "../../Context/AppProvider";
import PlayerProfile from "./PlayerProfile";

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
  const { user, users } = AppState();

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

  useEffect(() => {
    socket.on("data", setData(data));
    return () => {
      socket.removeAllListeners("data");
    };
  }, []);

  return (
    <Box m="10%" display="flex">
      {user && <PlayerProfile target={user} color="#013BB7" />}
      <Box height="fit-content" ml="10px" mr="10px">
        <canvas
          
          id="ping-pong"
          width="700"
          height="500"
          ref={canvasRef}
        ></canvas>
      </Box>
      {users && <PlayerProfile target={users[0]} color="#df0225" />}
    </Box>
  );
};

export default Game;
