import { Box, Button, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import Lottie from "react-lottie";
import animationData from "../../Pages/secuity-2fa-code.json";
import { FcLock } from "react-icons/fc";

const TwoFactorDoc = ({ barCode, verify, setBarCode, setVerify }: any) => {
  const { user } = AppState();

  const setTwoFactorAuthentication = () => {
    if (user.isTwoFactorAuthenticationEnabled) setVerify(true);
    else setBarCode(true);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      ml="50px"
      bg="#2B2D31"
      width="650px"
      borderRadius="lg"
      display={!barCode && !verify ? "flex" : "none"}
      flexDir="column"
      justifyContent="flex-end"
      color="white"
      // className="debug"
    >
      <Box display="flex" mb="20px" alignItems="center">
        <FcLock size="20px" />
        <Text fontWeight="bolder" fontSize="22px" color="gray.300" ml="5px">
          Protect your account with 2-Step Verification
        </Text>
      </Box>
      <Box
        display="flex"
        width="fit-content"
        // m="15px"
        mb="50px"
        minW="650px"
        alignItems="flex-end"
      >
        <Box width="250px" height="250px">
          <Lottie
            options={defaultOptions}
            style={{ backgroundColor: "#2B2D31" }}
          />
        </Box>
        <Text width="60%" color="gray" fontSize="22px" ml="20px">
          Prevent hackers from accessing your account with an additional layer
          of security. When you sign in, 2-Step Verification helps make sure
          that your personal information stays private, safe and secure.
        </Text>
      </Box>
      <Text
        fontWeight="bolder"
        fontSize="22px"
        mt="15px"
        mb="10px"
        color="gray.300"
      >
        Available second steps
      </Text>
      <Box
        display="flex"
        bg="#36373D"
        flexDir="column"
        alignItems="flex-start"
        p="15px"
        borderRadius="5px"
      >
        <Text fontWeight="bold" mb="5px">
          Authenticator app
        </Text>
        <Text color="gray">
          Instead of waiting for text messages, get verification codes from an
          authenticator app. it works even if your phone is offline. First,
          download Google Authenticator from Google play store or the iOS App
          Store
        </Text>
        <Box mt="15px" display="flex" justifyContent="flex-end" width="100%">
          <Button m="3px" bg="gray" borderRadius="3px">
            Change authenticator app{" "}
          </Button>
          <Button
            m="3px"
            borderRadius="3px"
            colorScheme="teal"
            onClick={setTwoFactorAuthentication}
          >
            {user && user.isTwoFactorAuthenticationEnabled
              ? "Turn Off"
              : "Turn On"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TwoFactorDoc;
