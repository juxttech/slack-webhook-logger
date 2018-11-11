import nock from 'nock';

import * as Logger from './Logger';

describe('Logger.ts', () => {
  describe('default', () => {
    test('shouldn\'t run console.info on .info if logInConsole is false', () => {
      const infoSpy = jest.spyOn(console, 'info');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo', false);
      logger.info('foo');

      expect(infoSpy).toHaveBeenCalledTimes(0);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      infoSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('should run console.info and postLog on .info', () => {
      const infoSpy = jest.spyOn(console, 'info');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo');
      logger.info('foo');

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      infoSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('shouldn\'t run console.warn on .warn if logInConsole is false', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo', false);
      logger.warn('foo');

      expect(warnSpy).toHaveBeenCalledTimes(0);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      warnSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('should run console.warn and postLog on .warn', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo');
      logger.warn('foo');

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      warnSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('shouldn\'t run console.error on .error if logInConsole is false', () => {
      const errorSpy = jest.spyOn(console, 'error');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo', false);
      logger.error('foo');

      expect(errorSpy).toHaveBeenCalledTimes(0);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      errorSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('should run console.error and postLog on .error', () => {
      const errorSpy = jest.spyOn(console, 'error');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo');
      logger.error('foo');

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      errorSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });
  });

  describe('postLog',  () => {
    test('should return the status of the request', async () => {
      nock('http://foo.com').post('/log').reply(200);

      const status = await Logger.postLog('http://foo.com/log', 'foo')
        .then(res => res.status);

      expect(status).toBe(200);
    });
  });

  describe('parseMessage',  () => {
    test('should return a string', () => {
      const message = Logger.parseMessage('foo');

      expect(message).toBe(JSON.stringify({ text: 'foo' }));
    });

    test('should return a string with options if given options', () => {
      const message = Logger.parseMessage({ foo: 'bar' });

      expect(message).toBe(JSON.stringify({ foo: 'bar' }));
    });
  });
});
