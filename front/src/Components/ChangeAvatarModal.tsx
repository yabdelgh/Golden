import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  IconButton,
  Text,
  Box,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  RadioGroup,
  HStack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import AvatarPreview from "./Avatar/AvatarUpdate";

const ChangeAvatarModal = ({ children, username, link }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
        />
      )}
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <AvatarPreview username={username} link={link} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChangeAvatarModal;
