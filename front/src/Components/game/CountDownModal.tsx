import {
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
  } from "@chakra-ui/react";
import CountDown from "./CountDown";
  
  const CountDownModal = ({isOpen, callback}:{isOpen: boolean, callback?: Function}) => {
  
    return (
      <Box>
        <Modal size="9xl" onClose={()=>{}} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow="none">
              <CountDown callback={callback}/>
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default CountDownModal;