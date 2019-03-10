const loggerValue = {
  // logs: ['hello', 'world'],
  log: (msg: string) => console.warn(`from values: ${msg}`),
  hello: () => {
    console.log('just say hello');
  }
};

export { loggerValue };
