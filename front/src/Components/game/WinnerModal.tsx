import {
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
  } from "@chakra-ui/react";
import Winner from "./Winner";
  
  const WinnerModal = ({ winner, isOpen }: any) => {
  
    return (
      <Box>
        <Modal size="3xl" onClose={()=>{}} isOpen={isOpen ?? false} isCentered>
          <ModalOverlay />
          <ModalContent>
              <Winner login={winner.login} image={winner.image} />
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default WinnerModal;