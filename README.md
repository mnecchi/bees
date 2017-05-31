# bees-request [![npm version](https://img.shields.io/npm/v/bees-request.svg?style=flat)](https://www.npmjs.com/package/bees-request)

A promise based simple abortable http client for node, browsers and react native.
bees-request uses the http or https modules on node and the XMLHttpRequest on the browsers and for React Native apps.

## Installation

NPM:

```
npm install bees-request
```

CDN:
``` html
<sccript src="https://unpkg.com/bees-request/umd/bees-request.min.js"></script>
```

## Usage

``` js
beesRequest.fetch(url[, options][, callback])
beesRequest.fetch(options)
```

options object has the following proprties:

* *url*: if the url is specified as a fetch argument, it overwrites the value in the options object if present
* *data*: optional data to be appended to the querystring (GET) or sent in the request body (POST)
* *headers*: optional key/value to be added to the request HTTP headers
* *timeout*: optional timeout for the request (in milliseconds)
* *callback*: function to be called when the request is sent. if the callback is specified as a fetch argument, it overwrites the value in the options object


Basic GET request:

``` js

beesRequest.fetch('http://example.com')
  .then(response => {
    // response is an instance of beesResponse object
    // it has the following methods:
    // response.json() returns a json object 
    // response.text() returns the plain text object
    // response.toString() alias to .text()
  })
  .catch(error => {
    // error is an instance of beesError
    // it has the following properties:
    // error.message
    // error.code
    // error.isAborted - an error is raised when the request is aborted
  });
  ```
Request with options:

``` js
  
beesRequest.fetch({
  url: 'http://example.com',
  method: 'GET', // at the moment it supports only GET and POST (default: GET)
  data: { // optional
    // key/value pairs. for the GET method data is appended to the querystring
  },
  headers: { // optional
    // key/value pairs.  
  },
  timeout: 10000 // timeout in milliseconds (optional)
})
  .then(response => {
    console.log(response.text())
  })
  .catch(error => {
    console.error(error.message)
  });
```

Abort example:

``` js
var request = null;

beesRequest.fetch({
  url: 'http://example.com'
}, (req) => {
  request = req
})
  .then(response => {
      console.log(response.text())
  })
  .catch(error => {
    if(error.isAborted) {
      // the request has been aborted
    } else {
      console.error(error.message)
    }
  });

request.abort();
```

Aliases:

``` js
beesRequest.get(url[, options][, callback]) // equivalent to fetch(url, options, callback) with options.method = 'GET'
beesRequest.get(options) // equivalent to fetch(url, options, callback) with options.method = 'GET'

beesRequest.post(url[, options][, callback]) // equivalent to fetch(url, options, callback) with options.method = 'POST'
beesRequest.post(options) // equivalent to fetch(url, options, callback) with options.method = 'POST'
```
  
