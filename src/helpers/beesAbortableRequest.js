"use strict";

class beesAbortableRequest {
    constructor(request) {
        this.abort = () => { 
            request.isAborted = true;
            request.abort(); 
        };
    }
}

module.exports = beesAbortableRequest;