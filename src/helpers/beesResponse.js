"use strict";

class beesResponse {
    constructor(body) {
        this.toString = () => { return body; };
        this.text = () => { return body; };
        this.json = () => { return JSON.parse(body); };
    }
}

module.exports = beesResponse;