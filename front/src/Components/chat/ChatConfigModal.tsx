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
import { FcIdea } from "react-icons/fc";
import { User } from "../../../types";
import { AppState } from "../../Context/AppProvider";

const ChatConfigModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedRoom, socket, users } = AppState();
  const [groupName, setGroupName] = useState("");
  const [friend, setFriend] = useState<any>(undefined);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

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

  const closeModal = () => {
    onClose();
    setFriend(undefined);
    setPassword("");
  };

  const addFriendToGroup = () => {
    console.log(password)
    socket.emit("addUserToRoom", {
      roomId: selectedRoom.id,
      userId: friend.id,
      password: password,
    });
  };

  return (
    <Box>
      {children ? <span onClick={onOpen}>{children}</span> : <></>}
      <Modal size="md" onClose={closeModal} isOpen={isOpen} isCentered>
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
            {selectedRoom.access === "Protected" && (
              <FormControl id="Password" isRequired mb={"20px"}>
                <Box display='flex' mb='3px'>
                  <FcIdea />
                  <Text>Please enter the password to make changes</Text>
                </Box>
                <InputGroup size="md">
                  <Input
                    onBlur={(e) => setPassword(e.target.value)}
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    focusBorderColor="gray.200"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      w="3.5rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "hide" : "show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
            <FormControl mb="5px">
              <InputGroup mb="5px">
                <Input
                  placeholder="add friend"
                  focusBorderColor="gray.200"
                  pl={!friend?.login ? "20px" : "50px"}
                  onChange={(e) => {
                    // setSearch(e.target.value);
                    ThereIsSomeOneToAdd(e.target.value);
                  }}
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
                    isDisabled={friend === undefined}
                    onClick={addFriendToGroup}
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
              Make this group public
            </Button>
            <Button width="100%" mb="5px">
              Make this group private
            </Button>
            <Button width="100%" mb="5px">
              Make this group protected
            </Button>
            <Button
              width="100%"
              mb="5px"
              bg="gray.300"
              onClick={() => leaveRoom()}
            >
              leave the group
            </Button>
            <Button
              width="100%"
              mb="5px"
              bg="gray.500"
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
