import { Box } from "@chakra-ui/react";
import { useState } from "react";
import TwoFactorBarCode from "../Components/twoFA/TwoFactorBarCode";
import TwoFactorCode from "../Components/twoFA/TwoFactorCode";
import TwoFactorDoc from "../Components/twoFA/TwoFactorDoc";

const SecurityPage = () => {
  const [verify, setVerify] = useState(false);
  const [barCode, setBarCode] = useState(false);

  return (
    <Box
      bg="#2B2D31"
      width="full"
      display="flex"
      ml="70px"
      p="150px"
      justifyContent="center"
      alignItems="flex-start"
      minWidth="700px"
      textAlign="justify"
    >
      <TwoFactorCode verify={verify} setVerify={setVerify} />
      <TwoFactorBarCode
        barCode={barCode}
        setVerify={setVerify}
        setBarCode={setBarCode}
      />
      <TwoFactorDoc
        barCode={barCode}
        verify={verify}
        setBarCode={setBarCode}
        setVerify={setVerify}
      />
    </Box>
  );
};

export default SecurityPage;
