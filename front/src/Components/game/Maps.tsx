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
      height="160px"
      display="flex"
      color="gray.200"
      borderRadius="lg"
      justifyContent="space-around"
      // className="debug"
    >
      <RadioEx {...getRadioProps({ value: "Simple" })}>
        <Box display={"flex"}  width="120px" height="100px" flexDir="column" alignItems={"center"}>
          <Image
            src="simple.png"
            width="100%"
            draggable={false}
            borderRadius="lg"
          />
          <Text>Simple</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "Crazy" })}>
        <Box display={"flex"}  width="120px" height="100px" flexDir="column" alignItems={"center"}>
          <Image
          borderRadius="lg"
            src="crazy.png" width="230px" draggable={false} />
          <Text>Crazy</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "Unpredictable" })}>
        <Box display={"flex"}  width="120px" height="100px" flexDir="column" alignItems={"center"}>
          <Image src="unpredictable.png" width="230px" draggable={false}
          borderRadius="lg"
          />
          <Text>Unpredictable</Text>
        </Box>
      </RadioEx>
    </HStack>
  );
};

export default Maps;
