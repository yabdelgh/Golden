import { Box, HStack, Image, Text, useRadioGroup } from "@chakra-ui/react";
import RadioEx from "../RadioEx";

const Maps = ({ setMap }: any) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Maps",
    defaultValue: "Simple",
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
      <RadioEx {...getRadioProps({ value: "Simple" })}>
        <Box display={"flex"} flexDir="column" alignItems={"center"}>
          <Image src="defaultMap.png" width="130px" draggable={false} />
          <Text>Simple</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "Crazy" })}>
        <Box display={"flex"} flexDir="column" alignItems={"center"}>
          <Image src="defaultMap.png" width="130px" draggable={false} />
          <Text>Crazy</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "Unpredictable" })}>
        <Box display={"flex"} flexDir="column" alignItems={"center"}>
          <Image src="defaultMap.png" width="130px" draggable={false} />
          <Text>Unpredictable</Text>
        </Box>
      </RadioEx>
    </HStack>
  );
};

export default Maps;
