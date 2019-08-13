module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/register.js

const GLOBAL = {};
function global(key) {
  if (GLOBAL[key]) {
    return GLOBAL[key];
  }

  throw Error(`"${key}" is not registered Middleware.`);
}
function register(key, middleware) {
  if (typeof key !== 'string' || !key.toString().length) {
    throw Error('A key is required to register a global MiddleWare');
  }

  return GLOBAL[key] = instance(middleware);
}
/* harmony default export */ var src_register = (register);
// CONCATENATED MODULE: ./src/MiddlewareError.js

const MESSAGE = 'Middleware failed to validate.';
class MiddlewareError_MiddlewareError extends Error {
  constructor(middleware, {
    to,
    from,
    next
  }, response, msg, ...args) {
    if (!(middleware instanceof Middleware_Middleware)) {
      throw new Error('The first argument must be an instance of Middleware.');
    }

    super(msg || MESSAGE, ...args);
    this.to = to;
    this.from = from;
    this.next = next;
    this.response = response;
    this.middleware = middleware;
    Error.captureStackTrace(this, MiddlewareError_MiddlewareError);
  }

}
// CONCATENATED MODULE: ./src/Middleware.js

class Middleware_Middleware {
  constructor(validator) {
    this.validator = validator;
  }

  get validator() {
    return this.$validator;
  }

  set validator(value) {
    if (!(value instanceof Function)) {
      this.$validator = () => !!value;
    } else {
      this.$validator = value;
    }
  }

  validate(to, from, next) {
    return new Promise((resolve, reject) => {
      const response = this.validator(to, from, next);

      if (response instanceof Promise) {
        response.then(resolve, reject);
      } else if (response === true) {
        resolve(this);
      } else {
        reject(new MiddlewareError_MiddlewareError(this, {
          to,
          from,
          next
        }, response));
      }
    });
  }

}
// CONCATENATED MODULE: ./src/instance.js


function instance(item) {
  if (item instanceof Middleware_Middleware) {
    return item;
  } else if (typeof item === 'string') {
    return global(item);
  }

  return new Middleware_Middleware(item);
}
// CONCATENATED MODULE: ./src/MiddlewareIterator.js

class MiddlewareIterator_MiddlewareIterator {
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

    if (this.items[i]) {
      this.items[i].splice(i, 1);
    }

    return this;
  }

  validate(to, from, next) {
    const promises = this.items.map(item => item.validate(to, from, next));
    return new Promise((resolve, reject) => {
      Promise.all(promises).then(() => {
        resolve({
          to,
          from,
          next
        });
      }, e => {
        reject(e);
      });
    });
  }

  get items() {
    return this.$items;
  }

  set items(items) {
    if (!(items instanceof Array)) {
      items = [items];
    }

    this.$items = items.map(item => instance(item));
  }

  [Symbol.iterator]() {
    return this.items.values();
  }

}
// CONCATENATED MODULE: ./src/MiddlewareRoute.js

class MiddlewareRoute_Route {
  constructor(route, middleware) {
    if (route instanceof String) {
      route = {
        path: route
      };
    }

    if (!(route instanceof Object)) {
      throw Error('Middleware instances must be instantiated with a string or object.');
    }

    this.middlewares = new MiddlewareIterator_MiddlewareIterator();
    this.callbacks = {
      onValid: [],
      onError: []
    };

    for (const [key, value] of Object.entries(route)) {
      if (value instanceof Function && this.callbacks[key]) {
        this.callbacks[key].push(value);
      } else if (this[key] instanceof Function) {
        this[key](value);
      } else {
        this[key] = value;
      }
    }

    if (route.middleware) {
      this.middleware(route.middleware);
    } else if (route.meta && route.meta.middleware) {
      this.middleware(route.meta.middleware);
    }

    this.beforeEnter = (to, from, next) => {
      this.middlewares.validate(to, from, next).then(() => {
        this.emit('onValid', to, from, next);

        if (route.beforeEnter && route.beforeEnter instanceof Function) {
          route.beforeEnter(to, from, next);
        } else {
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
    if (!(value instanceof MiddlewareIterator_MiddlewareIterator)) {
      value = new MiddlewareIterator_MiddlewareIterator(value);
    }

    this.$middlewares = value;
  }

  get middlewares() {
    return this.$middlewares;
  }

  middleware(value) {
    if (!(value instanceof Array)) {
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
    if (this.callbacks[key]) {
      this.callbacks[key].forEach(fn => fn(...args));
    }
  }

  callback(key, fn) {
    if (!(fn instanceof Function)) {
      throw Error('Callback must be an instance of a Function.');
    }

    this.callbacks[key] = fn;
    return this;
  }

}
// CONCATENATED MODULE: ./src/route.js

function route_route(middleware, args) {
  return new MiddlewareRoute_Route(middleware, args);
}
// CONCATENATED MODULE: ./src/index.js







// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js
/* concated harmony reexport route */__webpack_require__.d(__webpack_exports__, "route", function() { return route_route; });
/* concated harmony reexport global */__webpack_require__.d(__webpack_exports__, "global", function() { return global; });
/* concated harmony reexport register */__webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* concated harmony reexport instance */__webpack_require__.d(__webpack_exports__, "instance", function() { return instance; });
/* concated harmony reexport Middleware */__webpack_require__.d(__webpack_exports__, "Middleware", function() { return Middleware_Middleware; });
/* concated harmony reexport MiddlewareRoute */__webpack_require__.d(__webpack_exports__, "MiddlewareRoute", function() { return MiddlewareRoute_Route; });
/* concated harmony reexport MiddlewareIterator */__webpack_require__.d(__webpack_exports__, "MiddlewareIterator", function() { return MiddlewareIterator_MiddlewareIterator; });




/***/ })

/******/ })["default"];
//# sourceMappingURL=VueMiddlewares.common.js.map