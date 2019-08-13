import MiddlewareError from "./MiddlewareError";

export default class Middleware {

    constructor(validator) {
        this.validator = validator;
    }

    get validator() {
        return this.$validator;
    }

    set validator(value) {
        if(!(value instanceof Function)) {
            this.$validator = () => !!value;
        }
        else {
            this.$validator = value;
        }
    }

    validate(to, from, next) {
        return new Promise((resolve, reject) => {
            const response = this.validator(to, from, next);

            if(response instanceof Promise) {
                response.then(resolve, reject);
            }
            else if(response === true) {
                resolve(this);
            }
            else {
                reject(new MiddlewareError(this, {to, from, next}, response));
            }
        });
    }

}