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
import axios from "axios";
import { useState } from "react";
import { errorToast, successToast, warningToast } from "../Utils/Toast";

const CreateGroupModal = ({ children }: any) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [access, setAccess] = useState("private");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const createNewGroup = () => {
    if (name === "")
      warningToast(toast, "Please enter a group name");
    else if (access === "protected" && password === "")
      warningToast(toast, "Please enter a password");
    else
      axios
        .post("/api/chat/newRoom", { name, access, password })
        .then(() => {
          successToast(toast, "group created successfully");
          onClose();
        })
        .catch(() => {
          errorToast(toast, "group name already exist");
        });
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
            <Text>Create a new group</Text>
          </ModalHeader>
          <ModalBody>
            <FormControl mb="5px">
              <Input
                placeholder="Group name"
                focusBorderColor="gray.200"
                onBlur={(e) => setName(e.target.value)}
              />
            </FormControl>
            {access === "protected" && (
              <FormControl id="Password" isRequired>
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
            <FormControl as="fieldset" m="15px 40px">
              <RadioGroup onChange={setAccess} value={access}>
                <HStack spacing="24px">
                  <Radio value="private">Private</Radio>
                  <Radio value="public">public</Radio>
                  <Radio value="protected">Protected</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button
              width="100%"
              mb="5px"
              bg="green.300"
              onClick={createNewGroup}
            >
              create
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateGroupModal;
