# bees-request [![npm version](https://img.shields.io/npm/v/bees-request.svg?style=flat)](https://www.npmjs.com/package/bees-request)

A promise based simple abortable http client for node, browsers and react native.

## Installation

```
npm install bees-request
```
## Usage

bees-request uses the http or https modules on node and the XMLHttpRequest on the browsers and for React Native apps.

Basic GET request:

``` js
var bees = require('bees-request');

bees.fetch('http://example.com')
  .then(response => {
    // response is an instance of beesResponse
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
  var bees = require('bees-request');
  
  bees.fetch('http://example.com', {
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
      ...
    })
    .catch(error =. {
      ...
    });
  ```
  
  Abort example:
  
  ``` js
  var bees = require('bees-request');
  var request = null;
  
  bees.fetch('http://example.com', {
    ...
  }, (req) => {
    request = req;
  })
    .then(response => {
      ...
    })
    .catch(error =. {
      if(error.isAborted) {
        // the request has been aborted
      }
    });
  
  request.abort();
  ```
