import {
  Box,
  Text,
  Button,
  IconButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import axios from "axios";
import { HiOutlineLockClosed, HiOutlineLogout } from "react-icons/hi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import {
  IoGameControllerOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import SearchModal from "./SearchModal";
import {
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";
import ChallengeButton from "./Buttons/ChallengeButton";
import Challenge from "./game/Challenge";

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { challenges } = AppState();

  return (
    <>
      <IconButton
        variant={"unstyled"}
        aria-label="Search database"
        icon={<IoGameControllerOutline size="30px" />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent
          mt="70px"
          mr="50px"
          width='30px'
          height="fit-content"
          borderRadius="lg"
          display="flex"
          alignItems='center'
          justifyContent='space-around'
        >
          <Text mt='15px'>Challenges ({challenges.length})</Text>
          {challenges.length !== 0 && <Challenge challenge={challenges[0]} />}
          <Button m='10px' variant="solid" colorScheme="teal" width="95%" onClick={() => navigate('/game')}>
            create a game
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const ChatHeader = () => {
  const navigate = useNavigate();
  const { user, setUser, socket } = AppState();

  const logoutHandler = () => {
    axios.get("/api/auth/logout");
    socket.disconnect();
    setUser({});
    navigate("/");
  };

  return (
    <Box
      border="5px white solid"
      bg="white"
      height="60px"
      width="100%"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      position="fixed"
    >
      <Text
        color="teal"
        fontSize="2xl"
        fontFamily="Work sans"
        fontWeight="bold"
      >
        Golden
      </Text>
      <SearchModal>
        <Button leftIcon={<BsSearch />} fontFamily="Inter" width="100%">
          Search Golden
        </Button>
      </SearchModal>
      <Box
        width="210px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          variant={"unstyled"}
          aria-label="Search database"
          icon={<IoChatbubblesOutline size="30px" />}
          onClick={() => navigate("/chat")}
        />
        <DrawerExample />
        <Menu offset={[20, 8]}>
          <MenuButton size="35px" variant="unstyled" as={IconButton}>
            <IoMdNotifications size="35px" />
          </MenuButton>
          <MenuList zIndex="dropdown">
            <MenuItem>Msg</MenuItem>
          </MenuList>
        </Menu>
        <Popover>
          <PopoverTrigger>
            <Avatar
              bg="teal"
              color="white"
              size="md"
              cursor="pointer"
              name={user.login}
              src={user.imageUrl}
            />
          </PopoverTrigger>
          <PopoverContent
            width="130px"
            boxShadow="none"
            _focus={{ boxShadow: "none" }}
          >
            <PopoverArrow />
            <PopoverBody>
              <Button
                display="flex"
                justifyContent="space-around"
                variant="unstyled"
                width="100%"
                onClick={() => navigate("/security")}
              >
                Security <HiOutlineLockClosed size="20px" />
              </Button>
              <Button
                display="flex"
                justifyContent="space-around"
                variant={"unstyled"}
                width="100%"
                onClick={logoutHandler}
              >
                Log out <HiOutlineLogout size="20px" />
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default ChatHeader;
