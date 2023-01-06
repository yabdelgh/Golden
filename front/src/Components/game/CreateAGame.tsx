import { Box, Button, Text } from "@chakra-ui/react";
import PlayWith from "./PlayWith";
import Maps from "../game/Maps";

const CreateAGame = ({opponentType, setOpenentType, setMap, setInvit, send }: any) => {

  return (
    <Box
      height="700px"
      m="100px"
      width="700px"
      bg="white"
      borderRadius="lg"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
    >
      <Text fontSize="40px" color="gray.500">
        Create a game
      </Text>
      <Box width="90%" m="10px">
        <Text fontSize="30px" color="gray.500">
          Maps
        </Text>
        <Maps setMap={setMap} />
      </Box>
      <Box m="10px" width="90%">
        <Text fontSize="30px" color="gray.500">
          Opponents
        </Text>
        <PlayWith setOpenent={setOpenentType} />
      </Box>
      <Box width="90%" display="flex" justifyContent={"flex-end"}>
        <Button width="100px" m="10px">
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
