import { Drawer, DrawerContent } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";

import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
const NavBar = () => {
  const Navigate = useNavigate();
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
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerContent mt="30vh" ml='10px' borderRadius='lg' height="400px" maxW="75px" bgColor="teal" >
          <Button
            variant="unstyled"
            height="100px"
            display="flex"
            color="gray"
            _hover={{ color: "white" }}
            onClick={() => Navigate("/profile")}
          >
            <AiOutlineUser size="50px" />
          </Button>
          <Button
            variant="unstyled"
            height="100px"
            display="flex"
            color="gray"
            _hover={{ color: "white" }}
            onClick={() => Navigate("/friends")}
          >
            <HiOutlineUsers size="50px" />
          </Button>
          <Button
            variant="unstyled"
            height="100px"
            display="flex"
            color="gray"
            _hover={{ color: "white" }}
            onClick={() => Navigate("/chat")}
          >
            <IoChatbubblesOutline size="50px" />
          </Button>
          <Button
            variant="unstyled"
            height="100px"
            display="flex"
            color="gray"
            _hover={{ color: "white" }}
            onClick={() => Navigate("/profile")}
          >
            <IoGameControllerOutline size="50px" />
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
