import { Box } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";

const ProfilecontentBox = ({ children }: any) => {

  const { isSmallerThan1200, isSmallerThan1800 } = AppState();

  return (
    <Box
      border="3px solid white"
      mb="5px"
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      minWidth="600px"
      height="fit-content"
      bg="white"
      width={isSmallerThan1200 ? "100%" : isSmallerThan1800 ? "49.9%" : "33%"}
    >
      {children}
    </Box>
  );
};

export default ProfilecontentBox;
