import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Text,
  Box,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Avatar,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../../../types";
import { AppState } from "../../Context/AppProvider";

const ChatConfigModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedRoom, socket, users } = AppState();
  const [groupName, setGroupName] = useState("");
  const [friend, setFriend] = useState<any>({});
  
  const ThereIsSomeOneToAdd = (value: any) => {
    const user = users.find((ele: User) => ele.login === value);
    setFriend(user);
  };
  const deleteRoom = () => {
    socket.emit("deleteRoom", selectedRoom);
  };
  const updateRoom = () => {
    socket.emit("updateRoom", { id: selectedRoom.id, name: groupName });
  };
  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomId: selectedRoom.id });
  };
  return (
    <Box>
      {children ? <span onClick={onOpen}>{children}</span> : <></>}
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          border="5px white solid"
          borderRadius="5px"
          fontFamily="Inter"
        >
          <ModalHeader>
            <Text color="gray.400">Chat settings</Text>
          </ModalHeader>
          <ModalBody>
            <FormControl mb="5px">
              <InputGroup mb="5px">
                <Input
                  placeholder="add friend"
                  focusBorderColor="gray.200"
                  pl={!friend.login ? "20px" : "50px"}
                />
                <InputLeftElement width="fit-content" pl="10px">
                  {friend && friend.login && (
                    <Avatar
                      bg="teal"
                      color="white"
                      size="sm"
                      cursor="pointer"
                      name={friend.login}
                      src={friend.imageUrl || "/defaultProfilePic.png"}
                    />
                  )}
                </InputLeftElement>
                <InputRightElement width="5rem">
                  <Button
                    m="10px"
                    height="75%"
                    bg="#BAD1C2"
                    fontSize="14px"
                    color="gray.500"
                  >
                    add
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
                    fontSize="14px"
                    color="gray.500"
                    bg="#BAD1C2"
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
            <Button
              width="100%"
              mb="5px"
              bg="red.300"
              onClick={() => leaveRoom()}
            >
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
