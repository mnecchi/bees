const beesResponse = require('./beesResponse');

class beesXmlHttp {
    fetch(url, options = {}, callback = () => {}, resolve = () => {}, reject = () => {}) {
        setTimeout(() => { 
            const test = { "test": "OK" };
            resolve(new beesResponse(JSON.stringify(test)));
        }, 1000);
    }
}

module.exports = beesXmlHttp;