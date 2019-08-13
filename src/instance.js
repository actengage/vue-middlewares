import { global } from "./register";
import Middleware from "./Middleware";

export default function instance(item) {
    if(item instanceof Middleware) {
        return item;
    }
    else if(typeof item === 'string') {
        return global(item);
    }

    return new Middleware(item);
}