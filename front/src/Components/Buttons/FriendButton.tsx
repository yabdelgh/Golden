import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState, } from "react";
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
        <Box>
            <Button
                height="35px"
                display={'flex'}
                onClick={() => socket.emit(action, target.id)}
            >
                {action}
            </Button>
        </Box>
    );
};

export default FriendButton;