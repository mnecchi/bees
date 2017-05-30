const beesHttp = require("./beesHttp");
const beesXmlHttp = require("./beesXmlHttp");

class bees {
    static getHttpHandler() {
        if(typeof XMLHttpRequest !== 'undefined') {
            return new beesXmlHttp();
        } else if(typeof process !== 'undefined') {
            return new beesHttp();
        }
    }

    static fetch(url, options, callback) {
        const handler = this.getHttpHandler();

        return new Promise((resolve, reject) => {
            try {
                handler.fetch(url, options, callback, resolve, reject);
            } catch(e) {
                reject(e);
            }
        });
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