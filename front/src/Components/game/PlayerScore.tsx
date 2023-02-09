import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const PlayerScore = ({ name, score, image }: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderWidth="2px"
      borderRadius="20px"
      p="40px"
      w="300px"
    >
      <Image
        src={image}
        rounded="100%"
        w="150px"
        h="150px"
        objectFit="cover"
        mb="20px"
      />
      <Text fontSize="30px" fontWeight="bold" color="gray.800">
        {name}
      </Text>
      <Text fontSize="30px" fontWeight="bold" color="gray.600">
        Score: {score}
      </Text>
    </Box>
  );
};

export default PlayerScore;
