import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const PlayerScore = ({ name, score, image, isLeft }: any) => {
  return (
    <Box
      display="flex"
      flexDirection={isLeft ? "row" : "row-reverse"}
      // alignItems="center"

      w="50%"
    >
      <Image
        src={image}
        rounded="100%"
        w="80px"
        h="80px"
        objectFit="cover"
        mr={isLeft ? "20px" : "0"}
        ml={isLeft ? "0" : "20px"}
        />
      
      <Box mr={isLeft ? "20px" : "0"} ml={isLeft ? "0" : "20px"} display="flex"
        flexDirection={isLeft ? "row" : "row-reverse"} 
        flexGrow="1"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="30px" fontWeight="bold" color="gray.200">
          {name}
        </Text>
        <Text fontSize="30px" fontWeight="bold" color="gray.200">
          {score}
        </Text>
      </Box>
    </Box>
  );
};

export default PlayerScore;
