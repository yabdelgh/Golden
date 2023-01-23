import { Box, Button, Text } from "@chakra-ui/react"
import Lottie from "react-lottie";
import { AppState } from "../../Context/AppProvider";
import User from "../UserButton";
import  animationData from './loadingPong.json'

const WaitAGame = () => {

  const { socket, user, setUser} = AppState();

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
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
      width="100%"
      height="100vh"
      bg="white"
      mt="70px"
      ml="72px"
    >
      <Box width="50%" height="50%">
        <Lottie options={defaultOptions} />
      </Box>
      <Text fontSize={"40px"} m="30px">
        waiting for opponent
      </Text>
      <Button
        variant={"solid"}
        colorScheme="red"
        width="120px"
        onClick={() => { socket.emit("cancelQuickPairing"); setUser((valu: any) => ({...user, WaitingAGame: false} ))}}
      >
        cancel
      </Button>
    </Box>
  );
}

export default WaitAGame