import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Lottie from "react-lottie";
import TwoFactorBarCode from "../Components/TwoFactorBarCode";
import TwoFactorCode from "../Components/TwoFactorCode";
import TwoFactorDoc from "../Components/TwoFactorDoc";
import animationData from "./secuity-2fa-code.json";

const SecurityPage = () => {
  const [verify, setVerify] = useState(false);
  const [barCode, setBarCode] = useState(false);

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
      bg="teal"
      mt='70px'
      ml='73px'
      width="full"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      textAlign="justify"
    >
      <Box width="450px" height="450px" border="0px solid red">
        <Lottie options={defaultOptions} style={{ backgroundColor: "teal" }} />
      </Box>
      <TwoFactorCode verify={verify} setVerify={setVerify} />
      <TwoFactorBarCode barCode={barCode} setVerify={setVerify} setBarCode={setBarCode} />
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
