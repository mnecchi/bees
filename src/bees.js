class bees {
    static fetch(url, options, callback) {
        let handlerClass = null;
        if(typeof XMLHttpRequest !== 'undefined') {
            // browser
            handlerClass = require('./beesXmlHttp');
        } else if(typeof process !== 'undefined') {
            //node
            handlerClass = require('./beesHttp');
        }

        if(handlerClass !== null) {
            const handler = new handlerClass();

            return new Promise((resolve, reject) => {
                try {
                    handler.fetch(url, options, callback, resolve, reject);
                } catch(e) {
                    //console.log(e);
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