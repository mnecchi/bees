"use strict";

class beesAbortableRequest {
    constructor(request) {
        this.request = request;
        this.request.isAborted = false;
    }

    abort() {
        this.request.isAborted = true;
        this.request.abort();
    }
}

module.exports = beesAbortableRequest;