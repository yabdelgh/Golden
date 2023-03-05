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
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <IconButton
            variant={"unstyled"}
            color="#B8B9BF"
            _hover={{ color: "white" }}
            aria-label="Search database"
            icon={<IoGameControllerOutline size="30px" />}
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent
          width="300px"
          boxShadow="none"
          bg="#1E1F22"
          borderColor="#2E3035"
              color="#B8B9BF"
          _focus={{ boxShadow: "none" }}
        >
          <PopoverArrow bg="#B8B9BF" />
          <PopoverBody>
            <Text width="115px"  m="auto" mt="10px">Challenges ({challenges.length})</Text>
            {challenges.length !== 0 && (
              <Challenge challenge={challenges[0]} onClose={onClose} />
            )}
            <Button
              mt="15px"
              mb="7px"
              variant="solid"
              colorScheme="teal"
              borderRadius="3px"
              width="100%"
              onClick={() => {
                onClose();
                navigate("/game");
              }}
            >
              create a game
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

const AppHeader = () => {
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
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="2px solid #2B2D31"
      pl="2rem"
    >
      <SearchModal>
        <Button
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
        mr="30px"
        justifyContent="space-between"
        alignItems="center"
      >
        <DrawerExample />
        <IoMdNotifications size="25px" color="#B8B9BF" />
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button variant="unstyled" display="flex">
              <GoSettings size="25px" cursor="pointer" color="#B8B9BF" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            p="5px"
            width="170px"
            boxShadow="none"
            bg="#1E1F22"
            borderColor="#2E3035"
            color="#B8B9BF"
            _focus={{ boxShadow: "none" }}
          >
            <PopoverArrow bg="#B8B9BF" />
            <PopoverBody>
              <Button
                display="flex"
                height="50px"
                justifyContent="space-around"
                borderBottom="1px solid #2E3035"
                borderRadius="0px"
                variant="unstyled"
                width="100%"
                onClick={() => {
                  setOpenEditProfile(true);
                }}
              >
                Settings
                <RiUserSettingsLine size="20px" />
              </Button>
              <Button
                display="flex"
                height="50px"
                justifyContent="space-around"
                borderBottom="1px solid #2E3035"
                variant="unstyled"
                width="100%"
                borderRadius="0px"
                onClick={() => {
                  navigate("/security");
                  onClose();
                }}
              >
                Security <HiOutlineLockClosed size="20px" />
              </Button>
              <Button
                display="flex"
                height="50px"
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

export default AppHeader;
