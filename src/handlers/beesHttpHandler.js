"use strict";

const urlHelper = require('url');
const querystring = require('querystring');
const beesAbortableRequest = require('../helpers/beesAbortableRequest');
const beesResponse = require('../helpers/beesResponse');
const beesError = require('../helpers/beesError');

class beesHttpHandler {
    fetch(options = {}, resolve = () => {}, reject = () => {}) {
        const { timeout } = options;
        let { url, method, data, headers, callback } = options;
        url = url || "";
        callback = callback || function() {};

        const parseUrl = urlHelper.parse(url);

        const { protocol, hostname, port, pathname, query } = parseUrl;
        let { path } = parseUrl;        
        
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

            let requestOptions = {
                method,
                protocol,
                hostname,
                port: port===null ? protocol==="https:" ? 443 : 80 : port,
                path,
                headers,
                data,
            };
            if(timeout !== undefined) {
                requestOptions['timeout'] = timeout;
            }

            this.doFetch(
                requestOptions, 
                response => {
                    resolve(new beesResponse(response));
                }, 
                error => {
                    reject(new beesError(error));
                }, 
                request => {
                    setTimeout(() => { 
                        callback(new beesAbortableRequest(request)); 
                    }, 100);
                }
            );
            
        }
    }

    doFetch(options, resolve, reject) {
        return null;
    }

}

module.exports = beesHttpHandler;