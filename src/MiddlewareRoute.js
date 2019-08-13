import MiddlewareIterator from "./MiddlewareIterator";

export default class Route {

    constructor(route, middleware) {
        if(route instanceof String) {
            route = {path: route};
        }

        if(!(route instanceof Object)) {
            throw Error('Middleware instances must be instantiated with a string or object.');
        }

        this.middlewares = new MiddlewareIterator;
        this.callbacks = { onValid: [], onError: [] };

        for(const [key, value] of Object.entries(route)) {
            if((value instanceof Function) && this.callbacks[key]) {
                this.callbacks[key].push(value);
            }
            else if(this[key] instanceof Function) {
                this[key](value);
            }
            else {
                this[key] = value;
            }
        }

        if(route.middleware) {
            this.middleware(route.middleware);
        }
        else if(route.meta && route.meta.middleware) {
            this.middleware(route.meta.middleware);
        }

        this.beforeEnter = (to, from, next) => {
            this.middlewares.validate(to, from, next).then(() => {
                this.emit('onValid', to, from, next);
                
                if(route.beforeEnter && route.beforeEnter instanceof Function) {
                    route.beforeEnter(to, from, next);
                }
                else {
                    next();
                }
            }, e => {
                this.emit('onError', e);
            });
        };
    }

    set callbacks(value) {
        this.$callbacks = value;
    }

    get callbacks() {
        return this.$callbacks;
    }

    set middlewares(value) {
        if(!(value instanceof MiddlewareIterator)) {
            value = new MiddlewareIterator(value);
        }

        this.$middlewares = value;
    }

    get middlewares() {
        return this.$middlewares;
    }

    middleware(value) {
        if(!(value instanceof Array)) {
            value = [value];
        }
        
        value.forEach(value => this.middlewares.add(value));
        
        return this;
    }
    
    onValid(fn) {
        return this.callback('onValid', fn);
    }
    
    onError(fn) {
        return this.callback('onError', fn);
    }

    emit(key, ...args) {
        if(this.callbacks[key]) {
            this.callbacks[key].forEach(fn => fn(...args));
        }
    }

    callback(key, fn) {
        if(!(fn instanceof Function)) {
            throw Error('Callback must be an instance of a Function.');
        }

        this.callbacks[key] = fn;

        return this;
    }
}