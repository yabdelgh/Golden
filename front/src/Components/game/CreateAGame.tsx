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
      borderRadius="lg"
      p="20px"
      bg="#2F3035"
      as="fieldset"
    >
      <Box
        display="flex"
        as="legend"
        alignItems="center"
        justifyContent="center"
        ml="20px"
      >
        <TfiGame size="40px" />
        <Text fontSize="35px" ml="20px">
          New Game
        </Text>
      </Box>
      <Box
        height="fit-content"
        width="450px"
        m="auto"
        display="flex"
        alignItems="center"
        justifyContent={"space-around"}
      >
        <Box
          as="fieldset"
          border="2px solid #B8B9BF"
          borderRadius={"lg"}
          display="flex"
          alignItems="space-around"
        >
          {/* <Text as="legend" fontSize="30px" whiteSpace="pre" ml="15px">
            {" "}
            Opponent{"  "}
          </Text> */}
          <Button
            variant={"outline"}
            m="10px"
            width="170px"
            height="150px"
            border="0px"
          >
            <RiAddLine size="full" color="#B8B9BF" />
          </Button>
        </Box>
        <Box as="fieldset" border="2px solid #B8B9BF" borderRadius={"lg"}>
          {/* <Text as="legend" fontSize="30px" whiteSpace="pre" ml="15px">
            {" "}
            Paddle{"  "}
          </Text> */}
          <Button
            variant={"outline"}
            width="170px"
            height="150px"
            border="0px"
            m="10px"
          >
            <RiAddLine size="full" color="#B8B9BF" />
          </Button>
        </Box>
      </Box>
      <Box
        as="fieldset"
        border="2px solid #B8B9BF"
        borderRadius={"lg"}
        width="100px"
        m="20px"
      >
        {/* <Text as="legend" fontSize="30px" whiteSpace="pre" ml="15px">
          {" "}
          Map{"  "}
        </Text> */}
        <Button
          variant={"outline"}
          border="0px"
          width="395px"
          height="200px"
          m="10px"
        >
          <RiAddLine size="full" color="#B8B9BF" />
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
