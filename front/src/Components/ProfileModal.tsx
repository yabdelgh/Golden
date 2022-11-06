import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }: any) => {
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
        <ModalContent
          border="5px white solid"
          width="400px"
          borderRadius="15px"
        >
          <ModalHeader p="0">
            <Image borderRadius="15px" width="100%" src={user.imageUrl} />
          </ModalHeader>
          <ModalBody>
            <Text fontSize="28px" fontFamily="Work sans">
              {user.login}
            </Text>
            <Text fontSize="28px" fontFamily="Work sans">
              {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileModal;
