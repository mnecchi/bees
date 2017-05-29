const urlHelper = require('url');
const querystring = require('querystring');
const beesResponse = require('../helpers/beesResponse');
const beesRequest = require('../helpers/beesRequest');
const http = require('http');
const https = require('https');

class beesHttp {
    fetch(url, options = {}, callback = () => {}, resolve = () => {}, reject = () => {}) {
        const parseUrl = urlHelper.parse(url);
        const { protocol, hostname, port, pathname, query } = parseUrl;
        let { path } = parseUrl;
        const reqObj = protocol==="https:" ? https : http;
        
        const { timeout } = options;
        let { method, data, headers } = options;

        method = (method || 'GET').trim().toUpperCase();
        headers = headers || {};
        data = data || {};

        if(['GET', 'POST'].indexOf(method) === -1) {
            reject({
                message: `Invalid method: ${method}`,
                code: -1,
            });
        } else {

            let qs = "";
            if(method === "GET"){
                qs = querystring.stringify(Object.assign(querystring.parse(query), data));
            } else  {
                qs = query;
            }
            path = `${pathname}${qs !== "" ? "?" : ""}${qs}`; 

            let body = "";
            let requestOptions = {
                method,
                protocol,
                hostname,
                port: port===null ? protocol==="https:" ? 443 : 80 : port,
                path,
                headers,
            };
            if(timeout !== undefined) {
                requestOptions['timeout'] = timeout;
            }

            //console.log(requestOptions);

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

            if(method === "POST") {
                request.write(querystring.stringify(data));
            }
            request.end();

            callback(new beesRequest(request));
        }
    }
}

module.exports = beesHttp;