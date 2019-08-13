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

    import { route, global } from '../src';
    import register from '../src/register';

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

