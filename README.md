# vue-middlewares

An extendible middleware wrapper for VueRouter.

## Features

- Extensible and written for ES6
- Supports global and route specific middleware
- Expressive, versatile, and easy to remember syntax

---

## Installation

#### NPM
    npm install vue-middlewares --save

----

## Basic Usage

    import Vue from 'vue';
    import VueRouter from 'vue-router';

    import Home from './views/Home';
    import Restricted from './views/Restricted';
    import Unrestricted from './views/Unrestricted';

    Vue.use(VueRouter);

    import { route, global, register } from 'vue-middlewares';

    // This is some global scope, this always returns true.
    register('global', () => true);

    const router = new VueRouter({
        routes: [
            route({
                path: '/',
                alias: '',
                name: 'home',
                component: Home,
                middleware: ['global']
            }),

            route({
                path: '/restricted',
                name: 'restricted',
                component: Restricted,
                onError: (e) => {
                    router.push({name: 'unrestricted'});
                }
            }).middleware([(to, from, next) => !!to.query.id]),

            route({
                path: '/unrestricted',
                name: 'unrestricted',
                component: Unrestricted
            })
        ]
    });

    export default router;

---

## Routes

Creating `MiddlewareRoute` instances can be instantiated or created with the `route` helper method. All the standard route params are supported. `MiddlewareRouter` merely wraps route and adds the validation.

    route({
        name: 'home',
        path: 'home'
    })

Route using a single Middleware...

    route({
        name: 'home',
        path: 'home',
        middleware: (to, from, next) => {
            // do something

            return true;
        }
    })


// Route with multiple middlewares

    route({
        name: 'home',
        path: 'home',
        middleware: [(to, from, next) => {
            // do something

            return true;
        }, (to, from, next) => {
            // do something

            return true;
        }]
    })

// Chainable syntax to define multiple middlewares.

    route({
        name: 'home',
        path: 'home'
    })
        .middleware((to, from, next) => {
            // do something
            return true;
        })
        .middleware((to, from, next) => {
            // do something
            return true;
        })

// You may also pass `Middleware` instances directly. `Function`'s are cast as `Middleware` instances automatically, so extending `Middleware` to make your own classes adds even more power.

    class CustomMiddleware extends Middleware {

        constructor(date) {
            super(() => {
                // Only show this route on saturday
                return this.date.getDay() === 6 ;
            });

            this.date = date;
        }

    }

    route({
        name: 'home',
        path: 'home',
        middleware: [
            new CustomMiddleware(new Date()),
        ]
    })

---

## Global Middleware

Creating rules to be shared across multiple routes is very easy.

    register('global', (to, from, next) => {
        // do something
        return true;
    });

    route({
        name: 'home',
        path: 'home',
        middleware: ['global', (to, from, next) => {
            // do something
            return true;
        }]
    })

---

## Callbacks

### `onValid(to, from, next)`

This callback is triggered anytime a route has passed all the Middleware validators.

    route({
        path: '/',
        alias: '',
        name: 'home',
        component: Home,
        middleware: ['global'],
        onValid(to, from, next) {
            // do something
        }
    })

### `onError(error)`

This callback is triggered anytime a route has failed one of the Middleware validators. A `MiddlewareError` instance is passed which extends `Error` and has a couple extra properties: `middleware`, `response`, `to`, `from`, `next`, and `msg`.

    route({
        path: '/',
        alias: '',
        name: 'home',
        component: Home,
        middleware: ['global'],
        onError(e) {
            console.log(e);
        }
    })

### Chaining

Alternative chaining syntax is supported. Use this to keep code organized or if you need to bind multiple callbacks for whatever reason.

    route({
        path: '/',
        alias: '',
        name: 'home',
        component: Home,
        middleware: ['global']
    })
        .onValid((to, from, next) => {
            // do something
        })
        .onValid((to, from, next) => {
            // do something
        })
        .onError(e => {
            // do something
        })
        .onError(e => {
            // do something
        });

