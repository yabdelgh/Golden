import { Box, HStack, Image, Text, useRadioGroup } from "@chakra-ui/react";
import RadioEx from "../RadioEx";

const Maps = ({ setMap }: any) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Maps",
    defaultValue: "default",
    onChange: setMap,
  });

  return (
    <HStack
      {...getRootProps()}
      width="100%"
      display="flex"
      m="10px"
      p="10px"
      border="2px solid #C1C2C7"
      borderRadius="lg"
      justifyContent="space-around"
    >
      <RadioEx {...getRadioProps({ value: "default" })}>
        <Box display={"flex"} flexDir="column" alignItems={"center"}>
          <Image src="defaultMap.png" width="130px" draggable={false} />
          <Text>default</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "pyramids" })}>
        <Box display={"flex"} flexDir="column" alignItems={"center"}>
          <Image src="defaultMap.png" width="130px" draggable={false} />
          <Text>Pyramids</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "squares" })}>
        <Box display={"flex"} flexDir="column" alignItems={"center"}>
          <Image src="defaultMap.png" width="130px" draggable={false} />
          <Text>Squares</Text>
        </Box>
      </RadioEx>
    </HStack>
  );
};

export default Maps;
