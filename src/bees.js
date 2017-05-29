const handlerAdapter = require('./handler/beesHttpHandler');
const handler = new handlerAdapter();

class bees {
    static fetch(url, options, callback) {

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