import { Box, Button, Text } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { TfiGame } from "react-icons/tfi";

const CreateAGame = ({ opponentType, setInvit, send }: any) => {
  return (
    <Box
      height="fit-content"
      width="fit-content"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      color="#B8B9BF"
      mt="50px"
      borderRadius="lg"
      p="10px"
      bg="#36373D"
      as="fieldset"
      // className="debug"
    >
      <Box
        display="flex"
        as="legend"
        alignItems="center"
        justifyContent="center"
        ml="20px"
      >
        <TfiGame size="25px" />
        <Text fontSize="25px" ml="20px">
          New Game
        </Text>
      </Box>
      <Box
        height="fit-content"
        width="fit-content"
        // m="auto"
        display="flex"
        alignItems="center"
        justifyContent={"space-around"}
      >
        <Button
          variant={"outline"}
          ml="10px"
          width="120px"
          height="100px"
          // border="0px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
        </Button>
        <Button
          variant={"outline"}
          width="120px"
          height="100px"
          // border="0px"
          ml="10px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
        </Button>
        <Button
          variant={"outline"}
          // border="0px"
          width="160px"
          height="100px"
          ml="10px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
        </Button>
        <Button
          variant={"solid"}
          width="120px"
          height="100px"
          colorScheme={"green"}
          ml="10px"
          fontSize="25px"
        >
          Play
        </Button>
      </Box>
      {/* <Box
        ml="auto"
        mr="10px"
        width="30%"
        display="flex"
        justifyContent={"flex-end"}
      >
        <Button
          width="100%"
          borderRadius="3px"
          m="10px"
          colorScheme={"teal"}
          onClick={() => (opponentType === "Friend" ? setInvit(true) : send())}
        >
          {opponentType === "Friend" ? "Challenge" : "Play"}
        </Button>
      </Box> */}
    </Box>
  );
};

export default CreateAGame;

//   {/* <Text fontSize="40px" color="#B8B9BF">
//   Create a game
// </Text> */}
//   {/* <Box>
//   <Text fontSize="30px" color="#B8B9BF">
//     Opponent
//   </Text>
//   <PlayWith setOpenent={setOpenentType} />
// </Box>
// <Box>
//   <Text fontSize="30px" color="#B8B9BF">
//     paddle
//   </Text>
//   <PlayWith setOpenent={setOpenentType} />
// </Box>
// <Box>
//   <Text fontSize="30px" color="#B8B9BF">
//     Map
//   </Text>
//   <Maps setMap={setMap} />
// </Box>
// <Box width="490px" display="flex" justifyContent={"flex-end"}>
//   <Button width="100px" m="10px" borderRadius="3px"
//   onClick={() => navigate('/profile')}
//   >
//     cancel
//   </Button>
//   <Button
//     width="100px"
//     borderRadius="3px"
//     m="10px"
//     colorScheme={"teal"}
//     onClick={() => (opponentType === "Friend" ? setInvit(true) : send())}
//   >
//     {opponentType === "Friend" ? "Next" : "Play"}
//   </Button>
// </Box> */}
