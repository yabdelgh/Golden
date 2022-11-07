import { Box, Text, Button, IconButton } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

const ChatHeader = () => {
  const Navigate = useNavigate();
  const { user, setUser} = ChatState();

  const logoutHandler =  () => {
    axios.get("/api/auth/logout");
    setUser({});
    Navigate('/')
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
        color="#4267B2"
        fontSize="2xl"
        fontFamily="Work sans"
        fontWeight="bold"
      >
        Pong-chat
      </Text>
      <Button leftIcon={<BsSearch />} display={{base: 'none', md: "flex"}} fontFamily="Inter" width="50%">
        Search Pong
      </Button>
      <Box width="110px" display="flex" justifyContent="space-between">
        <Menu offset={[20, 8]}>
          <MenuButton size="35px" variant="unstyled" as={IconButton}>
            <IoMdNotifications size="35px" />
          </MenuButton>
          <MenuList zIndex="dropdown">
            <MenuItem>Msg</MenuItem>
          </MenuList>
        </Menu>
        <Menu offset={[20,8]}  >
          <MenuButton isRound="true" as={IconButton} placement="0">
            <Avatar
              bg="#4267B2"
              color="white"
              size="md"
              cursor="pointer"
              name={user.login}
            />
          </MenuButton>
          <MenuList zIndex="dropdown">
            <ProfileModal user={user}>
              <MenuItem>Profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={logoutHandler}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default ChatHeader;
