import { Box, Button, Text } from "@chakra-ui/react";
import PlayWith from "./PlayWith";
import Maps from "../game/Maps";
import { useNavigate } from "react-router-dom";

const CreateAGame = ({opponentType, setOpenentType, setMap, setInvit, send }: any) => {

  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      width="100%"
      mt='2px'
      ml='2px'
      bg="white"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
    >
      <Text fontSize="40px" color="gray.500">
        Create a game
      </Text>
      <Box m="10px" maxW="1000px">
        <Text fontSize="30px" color="gray.500">
          Opponents
        </Text>
        <PlayWith setOpenent={setOpenentType} />
      </Box>
      <Box maxW='1000px' m="10px">
        <Text fontSize="30px" color="gray.500">
          Maps
        </Text>
        <Maps setMap={setMap} />
      </Box>
      <Box width="50%" display="flex" justifyContent={"flex-end"}>
        <Button width="100px" m="10px"
        onClick={() => navigate('/profile')}
        >
          cancel
        </Button>
        <Button
          width="100px"
          m="10px"
          colorScheme={"teal"}
          onClick={() => (opponentType === "Friend" ? setInvit(true) : send())}
        >
          {opponentType === "Friend" ? "Next" : "Play"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAGame;
