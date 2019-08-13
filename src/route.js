import MiddlewareRoute from './MiddlewareRoute';

export default function route(middleware, args) {
    return new MiddlewareRoute(middleware, args);
}