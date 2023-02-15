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
  useToast,
  useRadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcLock } from "react-icons/fc";
import { GiWorld } from "react-icons/gi";
import { errorToast, successToast, warningToast } from "../../Utils/Toast";
import RadioEx from "../RadioEx";
import { FcKey } from "react-icons/fc";
import axios from "axios";
import { AppState } from "../../Context/AppProvider";
import { Room } from "../../../types";

const CreateGroupModal = ({ children }: any) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [access, setAccess] = useState<'Public' | 'Protected' | 'Private'>("Public");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {setRooms} = AppState();

  const createNewGroup = () => {
    if (name === "") warningToast(toast, "Please enter a group name");
    else if (access === "Protected" && password.length < 4)
      warningToast(toast, "Please enter a strong password");
    else
    {
      axios.post('/api/chat/createRoom', {id: 0, name, access, password})
      .then((payload) => {
        onClose();
        successToast(toast, "group created successfully");
        setRooms((value: Room[]) => [payload.data, ...value]);
        setAccess('Public');
        setPassword("");
      })
      .catch((payload) => {errorToast(toast, payload)});
      
    } 
  };

  const { getRadioProps } = useRadioGroup({
    name: "access",
    value: access,
    onChange: (value : 'Public' | 'Protected' | 'Private') => setAccess(value),
  });
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
          borderRadius="5px"
          fontFamily="Inter"
        >
          <ModalHeader>
            <Text fontWeight="bold" color="gray.500">
              Create a new group
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormControl mb="5px">
              <Input
                placeholder="Group name"
                focusBorderColor="gray.200"
                onBlur={(e) => setName(e.target.value)}
              />
            </FormControl>
            {access === "Protected" && (
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
            <FormControl as="fieldset" m="15px 0px">
              <RadioGroup>
                <HStack spacing="16px">
                  <RadioEx {...getRadioProps({ value: "Private" })} bg='#BAD1C2'>
                    <Box display={"flex"} alignItems={"center"} width='fit-content'>
                      <FcLock size="20px" />
                      <Text m="0px 5px">Private</Text>
                    </Box>
                  </RadioEx>
                  <RadioEx {...getRadioProps({ value: "Protected" })} bg='#BAD1C2'>
                    <Box display={"flex"} alignItems={"center"}>
                      <FcKey size="20px" />
                      <Text m="0px 5px">Protected</Text>
                    </Box>
                  </RadioEx>
                  <RadioEx {...getRadioProps({ value: "Public" })} bg='#BAD1C2'>
                    <Box display={"flex"} alignItems={"center"}>
                      <GiWorld size="20px" />
                      <Text m='0px 5px'>public</Text>
                    </Box>
                  </RadioEx>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button
              width="100%"
              mb="5px"
              bg="#BAD1C2"
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
