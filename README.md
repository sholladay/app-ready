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

## Use with PM2

To achieve zero downtime deployments, PM2 needs to know when your app is ready to use. It tries to be smart and automatically waits for you to call `server.listen()`. However, there are some limitations with this (for more details, see [pm2#2573](https://github.com/Unitech/pm2/issues/2573)).

 - If you never actually call `server.listen()`, PM2 won't know what to do and will eventually time out and just assume your app is ready, given that it also hasn't crashed. But it may take a while.
 - If you do call `server.listen()`, but your app is not 100% ready at that point, then your app will receive traffic at the wrong time and it might blow up.

And besides, it is better to be explicit. Let's implement [graceful start](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-start) and tell PM2 to wait for a special signal!

```console
$ pm2 start app.js --wait-ready --listen-timeout 3000
```

Above, `--wait-ready` tells PM2 to ignore `server.listen()` and wait for the more explicit message that `appReady()` sends for you. This allows you to more precisely control when PM2 begins sending traffic to your app.

Just in case something goes wrong, `--listen-timeout` tells PM2 how long it should wait before assuming the app is alive.

Don't forget about graceful _stop_, see [handle-quit](https://github.com/sholladay/handle-quit).

## API

### appReady()

If the process is a child of another Node.js process, sends a [`message` event](https://nodejs.org/api/process.html#process_process_send_message_sendhandle_options_callback) to the parent with a value of `ready`. Otherwise, does nothing.

## Related

 - [handle-quit](https://github.com/sholladay/handle-quit) - Teach your process to shutdown gracefully

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
