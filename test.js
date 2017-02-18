import test from 'ava';
import appReady from '.';

const monkey = (obj, prop, fn) => {
    const original = Object.getOwnPropertyDescriptor(obj, prop);

    fn();

    delete obj[prop];
    if (original) {
        Object.defineProperty(obj, prop, original);
    }
};

test('appReady()', (t) => {
    t.is(typeof appReady, 'function');

    monkey(process, 'send', () => {
        let message;
        process.send = (str) => {
            message = str;
        };
        t.is(typeof message, 'undefined');
        appReady();
        t.is(message, 'ready');
    });
});
