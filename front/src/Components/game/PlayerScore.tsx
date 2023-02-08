import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const PlayerScore = ({ name, score, image }: any) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Image
        src={image}
        rounded="100%"
        w="100px"
        h="100px"
        objectFit="cover"
        mb="10px"
      />
      <Text fontSize="20px" fontWeight="bold">
        {name}
      </Text>
      <Text fontSize="16px">Score: {score}</Text>
    </Box>
  );
};

export default PlayerScore;
