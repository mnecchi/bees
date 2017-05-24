class bees {
    static getRequestHandler() {
        if(typeof XMLHttpRequest !== 'undefined') {
            // browser
            return require('./beesXmlHttp');
        } else if(typeof process !== 'undefined') {
            //node
            return require('./beesHttp');
        } else {
            return null;
        }
    }

    static fetch(url, options, callback) {
        const handlerClass = this.getRequestHandler();

        if(handlerClass !== null) {
            const handler = handlerClass();
            
            return new Promise((resolve, reject) => {
                try {
                    handler.fetch(url, options, callback, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        } else {
            throw new Error("No http or XmlHttpRequest module found");
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