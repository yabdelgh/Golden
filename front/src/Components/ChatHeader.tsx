import { Box, Text, Button, IconButton } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import axios from "axios";
import { HiOutlineLockClosed, HiOutlineLogout} from "react-icons/hi"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import SearchModal from "./SearchModal";
const ChatHeader = () => {
  const navigate = useNavigate();
  const { user, setUser, socket } = AppState();

  const logoutHandler =  () => {
    axios.get("/api/auth/logout");
    socket.disconnect();
    setUser({});
    navigate('/')
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
        Pong-chat
      </Text>
      <SearchModal>
        <Button
          leftIcon={<BsSearch />}
          //   display={{ base: "none", md: "flex" }}
          fontFamily="Inter"
          width="100%"
        >
          Search Pong
        </Button>
      </SearchModal>
      <Box width="110px" display="flex" justifyContent="space-between">
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
            />
          </PopoverTrigger>
          <PopoverContent width="130px">
            <PopoverArrow />
            <PopoverBody>
              <Button
                display="flex"
                justifyContent="space-around"
                variant="unstyled"
                width="100%"
                onClick={() => navigate('/security')}
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
