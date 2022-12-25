import { AppState } from "../../Context/AppProvider";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

const ParamButton = ({ target }: any) => {
  const { user, Friends } = AppState();

  return (
    <Popover>
        <PopoverTrigger>
          <Button
            color="teal"
            variant="unstyled"
            height="70px"
            width="110px"
            display={user.id === target.id ? 'none' : 'flex'}
            flexDir="column"
            justifyContent="space-around"
            borderRadius="10px"
          >
            <FaCog size="38px" />
            <Text>more</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent width="150px" fontFamily="work sans" borderRadius="lg">
          <PopoverArrow />
          <Button
            width="100%"
            bg="white"
            borderRadius="0px"
            borderTopRadius="lg"
        >
          add friend
          </Button>
          <Button
            width="100%"
            borderRadius="0px"
            borderBottomRadius="lg"
            bg="white"
        >
          block
          </Button>
        </PopoverContent>
      </Popover>
  );
};

export default ParamButton;
