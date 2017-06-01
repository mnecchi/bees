"use strict";

class beesResponse {
    constructor(body) {
        this.body = body;
    }

    toString() { return this.body; }
    text() { return this.body; }
    json() {
        try {
            return JSON.parse(this.body); 
        } catch(e) {
            if(e instanceof SyntaxError) {
                return {};
            } else {
                throw e;
            }
        }
    }
    isJson() {
        try { 
            JSON.parse(this.body);
            return true;
        } catch(e) {
            return false;
        }
    }
}

module.exports = beesResponse;