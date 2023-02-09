import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack height={'100%'}>
      <Skeleton height="20%" />
      <Skeleton height="20%" />
      <Skeleton height="20%" />
      <Skeleton height="20%" />
      <Skeleton height="20%" />
      <Skeleton height="20%" />
      <Skeleton height="20%" />
    </Stack>
  );
};

export default ChatLoading;
