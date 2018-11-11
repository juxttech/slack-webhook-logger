# slack-webhook-logger

> Send your application's logs to a Slack Webhook

slack-webhook-logger is essentially the same thing as [sumologic-logger](https://github.com/juxttech/sumologic-logger)
but with a few minor changes relating to Slack.

## Prerequisites

* Node.js 8.x

## Installation

1. `npm install slack-webhook-logger` or `yarn add slack-webhook-logger`

## Usage

Either a string or an object can be provided as a log

```typescript
import { Logger } from 'slack-webhook-logger';

const logger = new Logger({
  url: 'your slack webhook url',
});

logger.info('foo');
logger.warn({ some: 'object' });
logger.error('foo');
```

## Development

1. `yarn install`
2. `yarn run build`
