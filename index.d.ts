declare class Logger {
  constructor(url: string, logInConsole: boolean);

  info(message: string | any): VoidFunction
  warn(message: string | any): VoidFunction
  error(message: string | any): VoidFunction
}

export { Logger };
