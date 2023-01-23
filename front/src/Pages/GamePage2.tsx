import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { AppState } from "../Context/AppProvider";
import "../App.css";
import PlayWith from "../Components/game/PlayWith";
import Maps from "../Components/game/Maps";

const FPS = 60;
const PLAYER_WIDTH = 12;
const PLAYER_HEIGHT = 70;
const BALL_RADIUS = 7;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { challegens } = AppState();

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

    async function collision(player: any, lball: any) {
      player.top = player.y - lball.radius;
      player.bottom = player.y + PLAYER_HEIGHT + lball.radius;
      if (lball.y >= player.top && lball.y <= player.bottom)
        ball.velocityX *= -1.01;
    }

    const update = async () => {
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
        ball.velocityY *= -1.01;
      if (ball.x > canvas.width || ball.x < 0) clearInterval(interval);
      if (ball.x + ball.radius > canvas.width - PLAYER_WIDTH)
        collision(player2, ball);
      else if (ball.x - ball.radius < PLAYER_WIDTH && ball.x > PLAYER_WIDTH)
        collision(player1, ball);
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;
    };

    const game = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      render();
      update();
    };

    document.onkeydown = (event) => {
      if (event.key === "ArrowUp") {
        player1.y -= 10;
        player2.y -= 10;
      } else if (event.key === "ArrowDown") {
        player1.y += 10;
        player2.y += 10;
      }
    };
    const interval = setInterval(game, 1000 / FPS);
  }, []);

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <Box
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
        </Box>
        <Box
          m="10px"
          height="600px"
          width="600px"
          border="3px solid white"
          borderRadius="lg"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent={"center"}
        >
          <Box bg="white" width="90%" pl="90px" borderRadius="lg">
            <Text fontSize="40px">create a game</Text>
          </Box>
          <Box
            width="100%"
            m="30px"
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="space-around"
          >
            <Maps/>
            <PlayWith />
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems={"center"}
            justifyContent="flex-end"
          >
            <Button
              fontSize="30px"
              width="150px"
              variant="solid"
              colorScheme="gray"
              mr="10px"
            >
              cancel
            </Button>
            <Button
              fontSize="30px"
              width="150px"
              variant="solid"
              colorScheme="teal"
              mr="20px"
            >
              Pong
            </Button>
          </Box>
        </Box>
        {/* {userProfile && <PlayerProfile target={userProfile} color='#013BB7'/>} */}
        {/* <canvas id="ping-pong" width="700" height="500" ref={canvasRef}></canvas> */}
        {/* {users && <PlayerProfile target={ users[0]} color='#df0225' />}  */}
      </Box>
    </>
  );
};

export default GamePage;
