'use strict';

const appReady = () => {
    // Only available within a child process.
    if (typeof process.send === 'function') {
        process.send('ready');
    }
};

module.exports = appReady;
