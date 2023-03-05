import { Box, Button, Text } from "@chakra-ui/react";
import PlayWith from "./PlayWith";
import Maps from "../game/Maps";
import { useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";

const CreateAGame = ({
  opponentType,
  setOpenentType,
  setMap,
  setInvit,
  send,
}: any) => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      color="#B8B9BF"
      justifyContent={"center"}
      // className="debug"
    >
     
      <Box as="fieldset" border="2px solid #B8B9BF" borderRadius={"lg"} m="50px">
        <Text as="legend" fontSize="30px" whiteSpace="pre" ml="30px">
          {" "} Opponent{"  "}
        </Text>
        <Button
          variant={"outline"}
          width="300px"
          height="300px"
          m="30px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
        </Button>
      </Box>
      <Box as="fieldset" border="2px solid #B8B9BF" borderRadius={"lg"} m="50p">
        <Text as="legend" fontSize="30px" whiteSpace="pre" ml="30px">
          {" "} Paddle{"  "}
        </Text>
        <Button
          variant={"outline"}
          width="300px"
          height="300px"
          m="30px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
        </Button>
      </Box>
      <Box as="fieldset" border="2px solid #B8B9BF" borderRadius={"lg"} m="50px">
        <Text as="legend" fontSize="30px" whiteSpace="pre" ml="30px">
          {" "} Map{"  "}
        </Text>
        <Button
          variant={"outline"}
          width="300px"
          height="300px"
          m="30px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
        </Button>
      </Box>
      {/* <Text fontSize="40px" color="#B8B9BF">
        Create a game
      </Text> */}
      {/* <Box>
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
      </Box> */}
    </Box>
  );
};

export default CreateAGame;
