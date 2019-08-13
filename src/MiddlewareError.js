import Middleware from './Middleware';

const MESSAGE = 'Middleware failed to validate.';

export default class MiddlewareError extends Error {

    constructor(middleware, { to, from, next }, response, msg, ...args) {
        if(!(middleware instanceof Middleware)) {
            throw new Error('The first argument must be an instance of Middleware.');
        }

        super(msg || MESSAGE, ...args);

        this.to = to;
        this.from = from;
        this.next = next;
        this.response = response;
        this.middleware = middleware;

        Error.captureStackTrace(this, MiddlewareError);
    }

}