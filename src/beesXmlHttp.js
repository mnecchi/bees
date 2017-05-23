const urlHelper = require('url');
const querystring = require('querystring');
const beesResponse = require('./beesResponse');
const beesRequest = require('./beesRequest');

class beesXmlHttp {
    fetch(url, options = {}, callback = () => {}, resolve = () => {}, reject = () => {}) {
        const parseUrl = urlHelper.parse(url);
        const { protocol, host, pathname, query } = parseUrl;

        const { timeout } = options;
        let { data, method, headers } = options;

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
            switch(method) {
                case "GET":
                   qs = querystring.stringify(Object.assign(querystring.parse(query), data));
                   break;
                case "POST":
                    qs = query !== null ? query : "";
                    headers["Content-type"] = "application/x-www-form-urlencoded";
                    break;
                default:
                    break;
            }

            const xhr = new XMLHttpRequest();
            xhr.open(method, `${protocol}//${host}${pathname}${qs !== "" ? "?" : ""}${qs}`, true);
            
            if(timeout !== undefined) {
                xhr.timeout = timeout;
            }

            Object.keys(headers).map(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(new beesResponse(xhr.responseText));
                    } else {
                        reject({
                            message: xhr.statusText,
                            code: xhr.status,
                            isAborted: xhr.isAborted === true,
                        });
                    }
                }
            }

            xhr.send(method=="POST" ? querystring.stringify(data) : null);
            callback(new beesRequest(xhr));
        }
    }
}

module.exports = beesXmlHttp;