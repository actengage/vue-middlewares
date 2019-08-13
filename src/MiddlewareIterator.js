import instance from './instance';

export default class MiddlewareIterator {
    
    constructor(items) {
        this.items = items || [];
    }

    index(middleware) {
        return this.items.indexOf(middleware);
    }

    contains(middleware) {
        return !!this.index(middleware);
    }

    add(middleware) {
        this.items.push(instance(middleware));

        return this;
    }

    remove(middleware) {
        const i = this.index(middleware);

        if(this.items[i]) {
            this.items[i].splice(i, 1);
        }

        return this;
    }

    validate(to, from, next) {
        const promises = this.items.map(item => item.validate(to, from, next));

        return new Promise((resolve, reject) => {
            Promise.all(promises).then(() => {
                resolve({ to, from, next});
            }, e => {
                reject(e);
            });
        });
    }

    get items() {
        return this.$items;
    }

    set items(items) {
        if(!(items instanceof Array)) {
            items = [items];
        }

        this.$items = items.map(item => instance(item));
    }

    [Symbol.iterator]() {
        return this.items.values();
    }
}