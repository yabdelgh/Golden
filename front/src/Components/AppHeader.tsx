import { Box, Text, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
import { CgProfile } from "react-icons/cg";
import { IoGameControllerOutline } from "react-icons/io5";
import SearchModal from "./SearchModal";
import { Drawer, DrawerContent } from "@chakra-ui/react";
import Challenge from "./game/Challenge";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoSettings } from "react-icons/go";

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { challenges } = AppState();

  return (
    <>
      <IconButton
        variant={"unstyled"}
        color="#B8B9BF"
        _hover={{ color: "white" }}
        aria-label="Search database"
        icon={<IoGameControllerOutline size="30px" />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent
          bg="#1E1F22"
          mt="70px"
          mr="20px"
          width="30px"
          height="fit-content"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Text mt="15px">Challenges ({challenges.length})</Text>
          {challenges.length !== 0 && (
            <Challenge challenge={challenges[0]} onClose={onClose} />
          )}
          <Button
            m="10px"
            variant="solid"
            colorScheme="teal"
            width="95%"
            onClick={() => {
              onClose();
              navigate("/game");
            }}
          >
            create a game
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const ChatHeader = () => {
  const navigate = useNavigate();
  const { user, setUser, socket, setOpenEditProfile } = AppState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    axios.get("/api/auth/logout");
    socket.disconnect();
    setUser({});
    navigate("/");
  };

  return (
    <Box
      bg="#2E3035"
      height="60px"
      width="100%"
      display={user.login ? "flex" : "none"}
      justifyContent="space-between"
      px={"2rem"}
      alignItems="center"
      minWidth={"700px"}
      borderBottom="2px solid #2B2D31"
    >
      {/* <Text
        color="teal"
        fontSize="2xl"
        fontFamily="Work sans"
        fontWeight="bold"
      >
        Golden
      </Text> */}
      <SearchModal>
        <Button
          // leftIcon={<BsSearch />}
          fontFamily="Inter"
          width="150px"
          height="40px"
          bg="#2B2D31"
          color="#B8B9BF"
          variant="unstyled"
        >
          Search Golden
        </Button>
      </SearchModal>
      <Box
        width="140px"
        display="flex"
        mr="20px"
        justifyContent="space-between"
        alignItems="center"
      >
        <DrawerExample />
        <IoMdNotifications size="25px" color="#B8B9BF" />
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <GoSettings size="25px" cursor="pointer" color="#B8B9BF" />
            {/* <Avatar
              bg="teal"
              color="white"
              size="md"
              border="3px solid white"
              cursor="pointer"
              name={user.login}
              src={user.imageUrl || "/defaultProfilePic.png"}
            /> */}
          </PopoverTrigger>
          <PopoverContent
            width="150px"
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
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
              >
                Profile <CgProfile size="20px" />
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
              <Button
                display="flex"
                justifyContent="space-around"
                variant="unstyled"
                width="100%"
                onClick={() => {
                  navigate("/security");
                  onClose();
                }}
              >
                Security <HiOutlineLockClosed size="20px" />
              </Button>
              <Button
                display="flex"
                justifyContent="space-around"
                variant="unstyled"
                width="100%"
                onClick={() => {
                  setOpenEditProfile(true);
                }}
              >
                Settings
                <RiUserSettingsLine size="20px" />
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default ChatHeader;
