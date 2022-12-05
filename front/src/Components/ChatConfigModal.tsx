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
} from "@chakra-ui/react";
import { useState } from "react";
import { AppState } from "../Context/AppProvider";

const ChatConfigModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedRoom, socket } = AppState();
  const [groupName, setGroupName] = useState("");
  const deleteRoom = () => {
    socket.emit("deleteRoom", selectedRoom);
  };
  const updateRoom = () => {
    socket.emit("updateRoom", { id: selectedRoom.id, name: groupName });
  };

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
          borderRadius="15px"
          fontFamily="Inter"
        >
          <ModalHeader>
            <Text>Chat settings</Text>
          </ModalHeader>
          <ModalBody>
            <FormControl mb="5px">
              <InputGroup mb="5px">
                <Input
                  placeholder="invite friends"
                  focusBorderColor="gray.200"
                />
                <InputRightElement width="5rem">
                  <Button m="10px" height="75%" bg="green.300">
                    invite
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mb="5px">
              <InputGroup mb="5px">
                <Input
                  placeholder="group name"
                  focusBorderColor="gray.200"
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <InputRightElement width="5rem">
                  <Button
                    m="10px"
                    height="75%"
                    bg="green.300"
                    onClick={(e) => updateRoom()}
                  >
                    update
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button width="100%" mb="5px">
              access
            </Button>
            <Button width="100%" mb="5px" bg="red.300">
              leave the group
            </Button>
            <Button
              width="100%"
              mb="5px"
              bg="red.500"
              onClick={() => deleteRoom()}
            >
              delete the group
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChatConfigModal;
