import { Box, IconButton, Avatar } from "@chakra-ui/react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { MdExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  const { user, setUserProfile } = AppState();
  const navigate = useNavigate();

  return (
    <Box
      bg="#1E1F22"
      width="70px"
      // height="calc(100% - 80px)"
      height="100%"
      position="fixed"
      top="0"
      left="0"
      // borderRadius="lg"
      display={user.login ? "flex" : "none"}
      flexDir="column"
      alignItems="center"
      userSelect="none"
    >
      {/* <IconButton
        mt="20px"
        colorScheme="gray"
        width="50px"
        height="50px"
        borderRadius="20px"
        aria-label="Search database"
        icon={<CgProfile strokeWidth={0.1} size="30px" />}
        onClick={() => {
          setUserProfile(user);
          navigate("/profile");
        }}
      /> */}
      <Avatar
        mt="10px"
        colorScheme="gray"
        width="50px"
        height="50px"
        borderRadius="20px"
        cursor="pointer"
        name={user.login}
        src={user.imageUrl || "/defaultProfilePic.png"}
        onClick={() => {
          setUserProfile(user);
          navigate("/profile");
        }}
      />
      <IconButton
        mt="20px"
        bg="#36373D"
        width="50px"
        height="50px"
        color="white"
        borderRadius="20px"
        aria-label="Search database"
        icon={<HiChatBubbleLeftRight size="25px" />}
        onClick={() => navigate("/chat")}
      />
      <IconButton
        mt="20px"
        bg="#36373D"
        width="50px"
        height="50px"
        color="gray"
        borderRadius="20px"
        aria-label="Search database"
        icon={<MdExplore size="30px" />}
      />
    </Box>
  );
};

export default NavBar;
