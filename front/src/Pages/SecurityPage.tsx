import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Lottie from "react-lottie";
import TwoFactorBarCode from "../Components/twoFA/TwoFactorBarCode";
import TwoFactorCode from "../Components/twoFA/TwoFactorCode";
import TwoFactorDoc from "../Components/twoFA/TwoFactorDoc";
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
      bg="#2B2D31"
      width="full"
      display="flex"
      pb='10%'
      justifyContent={"center"}
      alignItems="flex-end"
      minWidth='700px'
      textAlign="justify"
    >
      <Box width="550px" height="550px" display={{base: 'none', xl:'flex'}}>
        <Lottie options={defaultOptions} style={{ backgroundColor: "#2B2D31" }} />
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
