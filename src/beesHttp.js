const beesHttpHandler = require('./beesHttpHandler');
const followRedirects = require('follow-redirects')

class beesHttp extends beesHttpHandler {
    doFetch(options, onResponse, onError, onStart) {
        const reqObj = options.protocol==="https:" ? followRedirects.https : followRedirects.http;
        let body = "";
        
        const request = reqObj.request(
            options, 
            (response) => {
                response.setEncoding('utf-8');

                if(response.statusCode !== 200) {
                    onError({
                        message: reqObj.STATUS_CODES[response.statusCode],
                        code: response.statusCode,
                    });
                }

                response.on('data', (chunk) => { body += chunk; });
                response.on('end', () => { onResponse(body); });
            }
        );

        request.on('error', (error) => {
            onError(error);
        });

        request.on('abort', () => { 
            onError({
                isAborted: true,
            });
        });

        if(options.method === "POST") {
            request.write(querystring.stringify(options.data));
        }
        request.end();

        onStart(request);
    }
}

module.exports = beesHttp;