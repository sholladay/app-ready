# app-ready [![Build status for app-ready on Circle CI.](https://img.shields.io/circleci/project/sholladay/app-ready/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/app-ready "App Ready Builds")

> Signal that your app is ready for use.

## Why?

 - Simple way to track async initialization.
 - Avoids polling the filesystem.
 - Enables [graceful start](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-start).

## Install

```sh
npm install app-ready --save
```

## Usage

Get it into your program.

```js
const appReady = require('app-ready');
```

Tell the parent process that we are ready.

```js
await database.connect();
await server.listen();
appReady();
```

## API

### appReady()

If the process is a child of another Node.js process, sends a `message` event to the parent with a value of `ready`. Otherwise, does nothing.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/app-ready/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/app-ready/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/app-ready/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/app-ready/blob/master/LICENSE "The license for app-ready.") © [Seth Holladay](http://seth-holladay.com "Author of app-ready.")

Go make something, dang it.
