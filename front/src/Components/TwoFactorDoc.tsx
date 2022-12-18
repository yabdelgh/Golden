import { Box, Button, Text } from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
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
        p="30px"
        bg="#E9EBEE"
        width="650px"
        height="450px"
        borderRadius="lg"
        display={(!barCode && !verify) ? 'flex' : 'none'}
        flexDir='column'
      >
        <Text fontWeight="bolder" fontSize="22px">
          Protect your account with 2-Step Verification
        </Text>
        <Text color="gray" m="10px" fontSize="18px">
          Prevent hackers from accessing your account with an additional layer
          of security. When you sign in, 2-Step Verification helps make sure
          that your personal information stays private, safe and secure.
        </Text>
        <Text fontWeight="bolder" fontSize="22px" mt="15px" mb="10px">
          Available second steps
        </Text>
        <Box
          display="flex"
          bg="white"
          flexDir="column"
          alignItems="flex-start"
          p="15px"
          borderRadius="lg"
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
            <Button m="3px">Change authenticator app </Button>
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