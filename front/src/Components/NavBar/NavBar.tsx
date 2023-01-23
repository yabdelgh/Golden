import { Avatar, Box, IconButton } from "@chakra-ui/react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";

const NavBar = () => {
  const { user, setUserProfile } = AppState();
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      width="70px"
      height='100%'
      position="fixed"
      top='70'
      left='0'
      display={user.login ? "flex" : "none"}
      flexDir="column"
      alignItems="center"
        userSelect='none'
    >
      <Avatar
        bg="teal"
        color="white"
        mt="10px"
        width="50px"
        height="50px"
        borderRadius="15px"
        cursor="pointer"
        
        name={user.login}
        src={user.imageUrl || "/defaultProfilePic.png"}
        onClick={() => { setUserProfile(user); navigate("/profile") }}
      />
      <IconButton
        mt="20px"
        colorScheme="gray"
        width="50px"
        height="50px"
        borderRadius="20px"
        aria-label="Search database"
        icon={<IoChatbubblesOutline size="30px" />}
        onClick={() => navigate("/chat")}
      />
      <IconButton
        mt="20px"
        colorScheme="gray"
        width="50px"
        height="50px"
        borderRadius="20px"
        aria-label="Search database"
        icon={<MdExplore size="30px" />}
      />
    </Box>
  );
};

export default NavBar;
