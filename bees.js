const urlHelper = require('url');
const querystring = require('querystring');

class bees {
    static fetch(url, options, callback) {
        let handler = null;
        try { 
            handler = new beesHttp(require('http'), require('https'));
        } catch(e) {
            try { 
                handler = new beesXmlHttp(require('xmlhttprequest'));
            } catch(e) {}
        }

        return new Promise((resolve, reject) => {
            try {
                handler.fetch(url, options, callback, resolve, reject);
            } catch(e) {
                console.log(e);
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

class beesResponse {
    constructor(body) {
        this.toString = () => { return body; };
        this.text = () => { return body; };
        this.json = () => { return JSON.parse(body); };
    }
}

class beesRequest {
    constructor(request) {
        this.abort = () => { request.abort(); };
    }
}

class beesHandler {
    fetch(url, options, callback, resolve, reject) { throw "Not implemented"; }
} 

class beesHttp extends beesHandler {
    constructor(http, https) {
        super();
        this.http = http;
        this.https = https;
    }

    fetch(url, options = {}, callback = () => {}, resolve = () => {}, reject = () => {}) {
        const parseUrl = urlHelper.parse(url);
        const { protocol, hostname, port, pathname, query } = parseUrl;
        let { path } = parseUrl;
        const reqObj = protocol==="https" ? this.https : this.http;
        
        const { data, timeout } = options;
        let { method, headers } = options;

        method = method || 'GET';
        headers = headers || {};

        if(reqObj.METHODS.indexOf(method.trim().toUpperCase()) === -1) {
            reject({
                message: `Invalid method: ${method}`,
                code: -1,
            });
        } else {

            if(method === 'GET') {
                const qs = querystring.stringify(Object.assign(querystring.parse(query), data));
                path = `${pathname}${qs !== "" ? "?" : ""}${qs}`;
            }

            let body = "";
            let requestOptions = {
                method,
                hostname,
                port,
                path,
                headers,
            };
            if(timeout !== undefined) {
                requestOptions['timeout'] = timeout;
            }

            const request = reqObj.request(
                requestOptions, 
                (response) => {
                    response.setEncoding('utf-8');

                    if(response.statusCode !== 200) {
                        reject({
                            message: reqObj.STATUS_CODES[response.statusCode],
                            code: response.statusCode,
                        });
                    }

                    response.on('data', (chunk) => { body += chunk; });
                    response.on('end', () => { resolve(new beesResponse(body)); });
                }
            );

            request.on('error', (error) => {
                reject({
                    message: error.message,
                    code: error.code,
                });
            });

            request.on('abort', () => { 
                reject({
                    message: 'aborted',
                    code: 0,
                    isAborted: true,
                });
            });

            request.end();

            callback(new beesRequest(request));
        }
    }
}

class beesXmlHttp extends beesHandler {
    constructor(xmlHttp) {
        super();
        this.xmlHttp = xmlHttp;
    }
}

module.exports = bees;