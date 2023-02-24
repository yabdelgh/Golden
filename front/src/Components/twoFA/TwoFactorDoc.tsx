import { Box, Button, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
const TwoFactorDoc = ({ barCode, verify, setBarCode, setVerify }: any) => {
    const { user } = AppState();
  
    const setTwoFactorAuthentication = () => { 
        if (user.isTwoFactorAuthenticationEnabled)
            setVerify(true);
        else
            setBarCode(true);
    }

    return (
      <Box
        ml="50px"
        bg="#2B2D31"
        width="650px"
        height="450px"
        borderRadius="lg"
        display={(!barCode && !verify) ? 'flex' : 'none'}
        flexDir='column'
        justifyContent="flex-end"
        color="white"
      >
        <Text fontWeight="bolder" fontSize="22px" color="gray.300">
          Protect your account with 2-Step Verification
        </Text>
        <Text color="gray" fontSize="18px">
          Prevent hackers from accessing your account with an additional layer
          of security. When you sign in, 2-Step Verification helps make sure
          that your personal information stays private, safe and secure.
        </Text>
        <Text fontWeight="bolder" fontSize="22px" mt="15px" mb="10px" color="gray.300">
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
            <Button m="3px" bg="gray">Change authenticator app </Button>
            <Button m="3px" colorScheme="teal" onClick={setTwoFactorAuthentication}>
              {user && user.isTwoFactorAuthenticationEnabled
                ? "Turn Off"
                : "Turn On"}
            </Button>
          </Box>
        </Box>
        </Box>
  )
}

export default TwoFactorDoc