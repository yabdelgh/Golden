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
      bg="#2B2D31"
      pl="20%"
      display="flex"
      flexDir="column"
      alignItems="flex-start"
      justifyContent={"center"}
      // className="debug"
    >
      {/* <Text fontSize="40px" color="#B8B9BF">
        Create a game
      </Text> */}
      <Box>
        <Text fontSize="30px" color="#B8B9BF">
          Opponent
        </Text>
        <PlayWith setOpenent={setOpenentType} />
      </Box>
      <Box>
        <Text fontSize="30px" color="#B8B9BF">
          paddle
        </Text>
        <PlayWith setOpenent={setOpenentType} />
      </Box>
      <Box>
        <Text fontSize="30px" color="#B8B9BF">
          Map
        </Text>
        <Maps setMap={setMap} />
      </Box>
      <Box width="490px" display="flex" justifyContent={"flex-end"}>
        <Button width="100px" m="10px" borderRadius="3px"
        onClick={() => navigate('/profile')}
        >
          cancel
        </Button>
        <Button
          width="100px"
          borderRadius="3px"
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
