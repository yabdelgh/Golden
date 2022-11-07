const errorToast = (toast: any, msg: string) => {
  toast({
    title: msg,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
};

const warningToast = (toast: any, msg: string) => {
  toast({
    title: msg,
    status: "warning",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
};

const successToast = (toast: any, msg: string) => {
  toast({
    title: msg,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
};

export { errorToast, successToast, warningToast };
