"use strict";

const beesHttp = require("./handlers/beesHttp");
const beesXmlHttp = require("./handlers/beesXmlHttp");
const beesError = require("./helpers/beesError");

class beesRequest {
    static getHttpHandler() {
        if(typeof XMLHttpRequest !== 'undefined') {
            return new beesXmlHttp();
        } else if(typeof process !== 'undefined') {
            return new beesHttp();
        } else {
            return null;
        }
    }

    static resolveArgs(args) {
        if(args.length >= 3) {
            return Object.assign(args[1], {
                url: args[0],
                callback: args[2]
            });
        } else if(args.length == 2) {
            switch(typeof args[1]) {
                case 'object':
                    return Object.assign(args[1], {
                        url: args[0],
                    });
                case 'function':
                    return {
                        url: args[0],
                        callback: args[1]
                    }
            }
        } else if(args.length == 1) {
            switch(typeof args[0]) {
                case 'object':
                    return args[0];
                case 'string':
                    return {
                        url: args[0]
                    };
            }
        } else {
            return {}
        }  
    }

    static doFetch(options) {
        const handler = this.getHttpHandler();

        if(handler !== null) {
            return new Promise((resolve, reject) => {
                try {
                    handler.fetch(options, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        } else {
            throw new beesError(new Error("No HTTP Handler found."));
        }
    }

    static fetch(...args) {
        this.doFetch(this.resolveArgs(args));
    }

    static get(...args) {
        return this.doFetch(Object.assign(
            this.resolveArgs(args), 
            { method: "GET" }
        ));
    }

    static post(...args) {
        return this.doFetch(Object.assign(
            this.resolveArgs(args), 
            { method: "POST" }
        ));
    }
}

module.exports = beesRequest;