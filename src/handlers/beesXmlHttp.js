"use strict";

const beesHttpHandler = require('./beesHttpHandler');
const querystring = require('querystring');

class beesXmlHttp extends beesHttpHandler {
    doFetch(options, onResponse, onError, onStart) {
        const { protocol, hostname, port, method, timeout, path, headers, data } = options;

        const xhr = new XMLHttpRequest();
        xhr.open(method, `${protocol}//${hostname}:${port}${path}`, true);
        
        if(typeof timeout !== "undefined") {
            xhr.timeout = timeout;
        }

        Object.keys(headers).map(key => {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    onResponse(xhr.responseText);
                } if(xhr.status===0 && !xhr.isAborted) {
                    onError({
                        message: "Could not connect to the server",
                    });
                } else {
                    onError({
                        message: xhr.statusText,
                        code: xhr.status,
                        isAborted: xhr.isAborted === true,
                    });
                }
            }
        }

        xhr.send(method=="POST" ? querystring.stringify(data) : null);
        onStart(xhr);
    }
}

module.exports = beesXmlHttp;