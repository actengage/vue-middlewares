import instance from './instance';

const GLOBAL = {};

export function global(key) {
    if(GLOBAL[key]) {
        return GLOBAL[key];
    }
    
    throw Error(`"${key}" is not registered Middleware.`);
}

export function register(key, middleware) {
    if(typeof key !== 'string' || !key.toString().length) {
        throw Error('A key is required to register a global MiddleWare');
    }
    
    return GLOBAL[key] = instance(middleware);
}

export default register;