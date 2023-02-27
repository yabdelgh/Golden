import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState, } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AppState } from "../../Context/AppProvider";

const FriendButton = ({ target }: any) => {
    const { userProfile, socket,Friends } = AppState();
    const [action, setAction] = useState('');

    useEffect(() => {
        const relation = Friends.find((ele: any) => (target.id === ele.user1Id || target.id === ele.user2Id));
        if (!relation)
            setAction('Add Friend')
        else if (relation.status === true)
            setAction('Unfriend')
        else if (relation.user1Id === target.id)
            setAction('Accept Request');
        else
            setAction('Delete Request');
    }, [userProfile, Friends, target]);


    return (
            <Button
                height="45px"
                width="100%"
                display="flex"
                p="0px 30px"
                borderRadius="3px"
                justifyContent={"space-between"}
                alignItems="center"
                variant="unstyled"
                bg="#36373D"
                rightIcon={<IoIosArrowForward/>}
                color="gray.200"
                onClick={() => socket.emit(action, target.id)}
            >
                {action}
            </Button>
    );
};

export default FriendButton;