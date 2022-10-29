import React from "react";
import { Box, Text, Button, Input, effect, IconButton } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
const ChatHeader = () => {
  return (
    <Box
      border="5px white solid"
      bg="white"
      height="60px"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <Text
        color="#4267B2"
        fontSize="2xl"
        fontFamily="Work sans"
        fontWeight="bold"
      >
        Pong-chat
      </Text>
      <Button leftIcon={<BsSearch />} fontFamily="Inter" width="40%">
        Search Pong
      </Button>
      <Box width='110px' display='flex' justifyContent='space-between'>
        <Menu>
          <MenuButton  isRound='true' as={IconButton}>
            <IoMdNotifications size='40px'/>
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      <Box>
        <Menu>
          <MenuButton isRound='true' as={IconButton}>
            <Avatar
              size="md"
              cursor="pointer"
              name='yassine' // change it
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      </Box>
    </Box>
  );
};

export default ChatHeader;
