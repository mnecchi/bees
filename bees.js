const urlHelper = require('url');
const querystring = require('querystring');

class bees {
    constructor() {
        try { 
            this._handler = new beesHttp(
                require('http'), 
                require('https')
            );
        } catch(e) {
            try { 
                this._handler = new beesXmlHttp(
                    require('xmlhttprequest')
                );
            } catch(e) {}
        }

        if(this._handler === undefined) {
            throw "http or XMLHttpRequest modules needed.";
        }
    }

    fetch(url, options) {
        return new Promise((resolve, reject) => {
            try {
                this._handler.fetch(url, options, resolve, reject);
            } catch(e) {
                console.log(e);
                reject(e);
            }
        });
    }

    get(url, options = {}) {
        options['method'] = "GET";
        return this.fetch(url, options);
    }

    post(url, options = {}) {
        options['method'] = "POST";
        return this.fetch(url, options);
    }

    abort() {
        this._handler.abort();
    }
}

class beesResponse {
    constructor(body) {
        this._body = body;
    }

    toString() { return body; }
    text() { return body; }
    json() { return JSON.parse(this._body); }
}

class beesHandler {
    fetch(url, options, resolve, reject) { throw "Not implemented"; }
    abort() { throw "Not implemented"; }
} 

class beesHttp extends beesHandler {
    constructor(http, https) {
        super();
        this.http = http;
        this.https = https;
    }

    fetch(url, options = {}, resolve = () => {}, reject = () => {}) {
        const parseUrl = urlHelper.parse(url);
        const { protocol, hostname, port, pathname, query } = parseUrl;
        let { path } = parseUrl;
        const reqObj = protocol==="https" ? this.https : this.http;
        
        const { data } = options;
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

            this._request = reqObj.request(
                {
                    method,
                    hostname,
                    port,
                    path,
                    headers,
                }, 
                (response) => {
                    response.setEncoding('utf-8');

                    if(response.statusCode !== 200) {
                        reject({
                            message: reqObj.STATUS_CODES[response.statusCode],
                            code: response.statusCode,
                        });
                    }

                    response.on('data', (chunk) => { body += chunk; });
                    response.on('end', () => { 
                        setTimeout(() => {
                            resolve(new beesResponse(body)); 
                        }, 5000);                        
                    });
                }
            );

            this._request.on('error', (error) => {
                reject({
                    message: error.message,
                    code: error.code,
                });
            });

            this._request.on('abort', () => { 
                reject({
                    message: 'aborted',
                    code: 0,
                    isAborted: true,
                });
            });

            this._request.end();
        }
    }

    abort() {
        this._request.abort();
    }
}

class beesXmlHttp extends beesHandler {
    constructor(xmlHttp) {
        super();
        this.xmlHttp = xmlHttp;
    }
}

module.exports = bees;