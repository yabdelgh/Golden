import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AppState } from "../Context/AppProvider";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "./ping-pong-icon.json";

const LoginPage = () => {
  const { user } = AppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/profile");
    }
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      width="100%"
      bg="teal"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <Box width="400px" height="400px">
        <Lottie options={defaultOptions} style={{ backgroundColor: "teal" }} />
      </Box>
      <Box
        width="50%"
        height="50%"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Text
          fontWeight="bold"
          width="100%"
          height="40%"
          pb="0"
          textAlign="center"
          fontSize="100"
          fontFamily="work sans"
          color="whiteAlpha.800"
        >
          Ping-Pong
        </Text>
        <Text
          width="100%"
          height="30%"
          textAlign="center"
          fontSize="50"
          fontFamily="work sans"
          color="whiteAlpha.500"
        >
          FREE, FAN AND READY TO PLAY!
        </Text>
        <Box width="30%" borderRadius="100%">
          <a href="http://localhost:3333/api/auth/login">
            <Button
              //  rightIcon={<FiArrowRight />}
              bg="#FF5323"
              width="310px"
              height="50px"
              variant="unstyled"
              size="lg"
              borderRadius="lg"
              color="white"
              fontWeight="bold"
              fontSize="20px"
              _hover={{ bg: "orange.600" }}
            >
              sign in with 42 account
            </Button>
          </a>
        </Box>
        <Box
          m="3% 10% 0% 10%"
          bg="white"
          border="3px solid white"
          borderRadius="md"
          color="green"
          display="none"
        >
          <Text textAlign="center" fontSize="4xl" fontFamily="work sans">
            free, fun and Ready to play!
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;