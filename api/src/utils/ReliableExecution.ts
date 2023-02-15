export const ReliableExecution = (maxTries, sleepTime, action) => {
  const interval = setInterval(() => {
    console.log('ReliableExecution');
    if (action()) maxTries = 0;
    else maxTries--;
    if (maxTries == 0) clearInterval(interval);
  }, sleepTime);
};
