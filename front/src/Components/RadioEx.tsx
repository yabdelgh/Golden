import { Box, useRadio } from "@chakra-ui/react";

// 1. Create a component that consumes the `useRadio` hook
function RadioEx( props : any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: props.bg || "teal",
        }}
        _focus={{
          boxShadow: "none",
          borderColor:'none'
        }}
        px={4}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default RadioEx