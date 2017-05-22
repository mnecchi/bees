(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bees"] = factory();
	else
		root["bees"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const beesResponse = __webpack_require__(2);

class beesXmlHttp {
    fetch(url, options = {}, callback = () => {}, resolve = () => {}, reject = () => {}) {
        setTimeout(() => { 
            const test = { "test": "OK" };
            resolve(new beesResponse(JSON.stringify(test)));
        }, 1000);
    }
}

module.exports = beesXmlHttp;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

class bees {
    static fetch(url, options, callback) {
        let handlerClass = null;
        if(typeof XMLHttpRequest !== 'undefined') {
            // browser
            handlerClass = __webpack_require__(0);
        } else if(typeof process !== 'undefined') {
            //node
            handlerClass = __webpack_require__(0);
        }

        if(handlerClass !== null) {
            const handler = new handlerClass();

            return new Promise((resolve, reject) => {
                try {
                    handler.fetch(url, options, callback, resolve, reject);
                } catch(e) {
                    console.log(e);
                    reject(e);
                }
            });
        }
    }

    static get(url, options = {}, callback) {
        options['method'] = "GET";
        return this.fetch(url, options, callback);
    }

    static post(url, options = {}, callback) {
        options['method'] = "POST";
        return this.fetch(url, options, callback);
    }
}

module.exports = bees;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class beesResponse {
    constructor(body) {
        this.toString = () => { return body; };
        this.text = () => { return body; };
        this.json = () => { return JSON.parse(body); };
    }
}

module.exports = beesResponse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bees.js.map