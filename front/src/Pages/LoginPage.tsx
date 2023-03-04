import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../Components/auth/login";
import SignUp from "../Components/auth/signUp";

const LoginPage = () => {
  return (
<Box bg="#1E1F22" display="flex" width="100%" pt="10%" alignItems="flex-start" justifyContent="center">
      <Box fontFamily="Pathway Gothic One" mr="150px">
        <Text fontSize="70px" color="teal" fontWeight="bold">
          transcendence
        </Text>
        <Text fontSize="45px" color="#B8B9BF">
          Free, Fan and Ready To Play !
        </Text>
      </Box>
              <Login />
              {/* <SignUp /> */}
      </Box>
  );
};
// import { Box, Button, Text } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { AppState } from "../Context/AppProvider";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const { user } = AppState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user.login) {
//       navigate("/profile");
//     }
//   });

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       bg="#1E1F22"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       position="fixed"
//       top="0"
//       left="0"
//       // className="debug"
//     >
//       <Box fontFamily='Pathway Gothic One'>
//           <Text fontSize="70px" color="teal" fontWeight="bold">transcendence</Text>
//           <Text fontSize="50px" color="#B8B9BF">FREE, FAN AND READY TO PLAY !</Text>
//         </Box>
//       <Box
//         width="50%"
//         height="400px"
//         minWidth="800px"
//         display="flex"
//         // flexDir="column"
//         alignItems="center"
//       >
//         <Box width="100%" display="flex" justifyContent="center">
//           <a href={`${process.env.REACT_APP_BACK_HOST}/api/auth/login`}>
//             <Button
//               bg="teal"
//               width="310px"
//               height="50px"
//               variant="unstyled"
//               size="lg"
//               borderRadius="3px"
//               color="white"
//               fontWeight="bold"
//               fontSize="20px"
//               _hover={{ bg: "teal.900" }}
//             >
//               SIGN IN WITH INTRA 42
//             </Button>
//           </a>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

export default LoginPage;
