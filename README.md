# app-ready [![Build status for App Ready](https://img.shields.io/circleci/project/sholladay/app-ready/master.svg "Build Status")](https://circleci.com/gh/sholladay/app-ready "Builds")

> Support [graceful start](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-start) in your app

Signal that your app is ready for use, so a process manager can bring it online at the right time.

## Why?

 - Allows any parent process to track async startup.
 - Avoids filesystem polling and "ready files".
 - Helps you do easy [zero downtime](https://futurestud.io/tutorials/pm2-cluster-mode-and-zero-downtime-restarts#zerodowntimedeployments) deployments.

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

To achieve zero downtime deployments, [PM2](https://github.com/Unitech/pm2) needs to know when your app is ready to use. It tries to be smart and automatically waits for you to call [`server.listen()`](https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback). However, there are some limitations with this (for more details, see [pm2#2573](https://github.com/Unitech/pm2/issues/2573)).

 - If you never actually call `server.listen()`, PM2 won't know what to do and will eventually time out and forcefully restart your app in an ettempt to get it to boot correctly.
 - If you do call `server.listen()`, but your app is not 100% ready at that point, then your app will receive traffic at the wrong time and it might blow up.

These problems can be fixed by being more explicit. Let's use [graceful start](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-start) and tell PM2 to wait for our signal!

```console
$ pm2 start app.js --wait-ready --listen-timeout 3000
```

Above, `--wait-ready` tells PM2 to ignore `server.listen()` and wait for the more explicit message that `appReady()` sends for you. This allows you to more precisely control when PM2 begins sending traffic to your app.

Just in case something goes wrong, `--listen-timeout` tells PM2 how long it should wait for the ready message before considering this a failed start, in which case it will restart the app and try again.

To support graceful _stop_, see [handle-quit](https://github.com/sholladay/handle-quit).

## API

### appReady()

If the process is a child of another Node.js process, sends a [`message` event](https://nodejs.org/api/process.html#process_process_send_message_sendhandle_options_callback) to the parent with a value of `ready`. Otherwise, does nothing.

## Related

 - [handle-quit](https://github.com/sholladay/handle-quit) - Support [graceful stop](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-stop) in your app

## Contributing

See our [contributing guidelines](https://github.com/sholladay/app-ready/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/app-ready/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/app-ready/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/app-ready/blob/master/LICENSE "License for app-ready") © [Seth Holladay](https://seth-holladay.com "Author of app-ready")

Go make something, dang it.
