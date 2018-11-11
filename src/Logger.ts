import chalk from 'chalk';
import isomorphicFetch from 'isomorphic-fetch';

const { cyan, red, yellow } = chalk;

export const parseMessage = (message: string | any) => JSON.stringify(typeof message === 'string' ?
  { text: message } : message);

export const postLog = async (url: string, message: string, options?: any) => {
  return isomorphicFetch(url, {
    method: 'POST',
    body: message,
  });
};

class Logger {
  endpoint: string;
  logInConsole: boolean;
  constructor(url: string, logInConsole = true) {
    this.endpoint = url;
    this.logInConsole = logInConsole;
  }

  public info(message: string | any) {
    const parsedMessage = parseMessage(message);
    if (this.logInConsole) {
      console.info(cyan(parsedMessage));
    }
    postLog(this.endpoint, parsedMessage);
  }

  public warn(message: string | any) {
    const parsedMessage = parseMessage(message);
    if (this.logInConsole) {
      console.warn(yellow(parsedMessage));
    }
    postLog(this.endpoint, parsedMessage);
  }

  public error(message: string | any) {
    const parsedMessage = parseMessage(message);
    if (this.logInConsole) {
      console.error(red(parsedMessage));
    }
    postLog(this.endpoint, parsedMessage);
  }
}

export default Logger;
