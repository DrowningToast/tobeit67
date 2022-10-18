const tokenRefresher = () => {
  const refresh = () => {
    setTimeout(() => {
      //@ts-ignore
      postMessage("Refresh ID Token");
      refresh();
      // Every 10 mins
    }, 600000);
  };

  //@ts-ignore
  self.onmessage = (e) => {
    refresh();
  };
};

export default tokenRefresher;
