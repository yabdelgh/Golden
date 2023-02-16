import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Room, User } from "../../types";
import { AppState } from "../Context/AppProvider";
import RoomButton from "./Buttons/RoomButton";
import TmpButton from "./TmpButton";

const SearchModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, rooms, socket, searchs } = AppState();
  const [searchPong, setSearchPong]: any = useState("");

  const search = (e: any) => {
    setSearchPong(e.target.value.trim());
    !users.some((ele: User) => ele.login.includes(e.target.value)) &&
      !rooms.some((ele: Room) => ele.name.includes(e.target.value)) &&
      !searchs.some((ele: any) => {
        if (ele.login) return ele.login.includes(e.target.value);
        else return ele.name.includes(e.target.value);
      }) &&
      socket.emit("search", {
        search: e.target.value,
      });
  };

  return (
    <Box width="50%">
      {children ? <span onClick={onOpen}>{children}</span> : <></>}
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display="flex"
          flexDir="column"
          alignItems="center"
          mt="80px"
          borderRadius="lg"
          minWidth="400px"
          maxWidth="600px"
          minHeight="50px"
          width="50%"
        >
          <FormControl height="30px" width="95%" margin="30px">
            <InputGroup>
              <Input
                autoCorrect="off"
                pl="60px"
                focusBorderColor="gray"
                height={"50px"}
                placeholder="Search Pong"
                value={searchPong}
                onChange={(e) => search(e)}
              />
              <InputLeftElement ml="20px" height={"50px"}>
                <IconButton
                  variant={"unstyled"}
                  aria-label="Search database"
                  icon={<BsSearch size="25px" color="gray" />}
                />
              </InputLeftElement>
            </InputGroup>
          </FormControl>
          <Box
            // border="2px solid red"
            width="95%"
            display="flex"
            flexDir="column"
            fontFamily="Inter"
            mb="20px"
            maxH="400px"
            overflowY="scroll"
            overflowX="hidden"
          >
            {searchs &&
              searchPong !== "" &&
              searchs.map((ele: any) => {
                if (ele.login && ele.login.includes(searchPong))
                  return <TmpButton ele={ele} onClose={onClose} key={ele.id} />;
                else if (ele.name && ele.name.includes(searchPong))
                  return (
                    <RoomButton ele={ele} onClose={onClose} key={ele.id} />
                  );
                else return undefined;
              })}
            {users &&
              searchPong !== "" &&
              users.map(
                (ele: User) =>
                  ele.login.includes(searchPong) && (
                    <TmpButton ele={ele} onClose={onClose} key={ele.id} />
                  )
              )}
            {rooms &&
              searchPong !== "" &&
              rooms.map(
                (ele: Room) =>
                  ele.isGroupChat &&
                  ele.name.includes(searchPong) && (
                    <RoomButton ele={ele} onClose={onClose} key={ele.id} />
                  )
              )}
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearchModal;
