import { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { MdTravelExplore } from "react-icons/md";
import { Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { IoChatbubblesOutline, IoGameControllerOutline } from "react-icons/io5";

import  NavBarButton from "./NavBarButton";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if (event.clientX < 20) onOpen();
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent
          mt="30vh"
          ml="10px"
          borderRadius="lg"
          height="400px"
          maxW="75px"
          bgColor="teal"
        >
          <NavBarButton pageName='/profile'>
            <AiOutlineUser size="50px" />
          </NavBarButton>
          <NavBarButton pageName='/chat'>
            <IoChatbubblesOutline size="50px" />
          </NavBarButton>
          <NavBarButton pageName='/game'>
            <IoGameControllerOutline size="50px" />
          </NavBarButton>
        <NavBarButton pageName='/world'>
            <MdTravelExplore size="50px" />
          </NavBarButton>
        </DrawerContent>
      </Drawer>
  );
};

export default NavBar;