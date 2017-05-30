class beesRequest {
    constructor(request) {
        this.abort = () => { 
            request.isAborted = true;
            request.abort(); 
        };
    }
}

module.exports = beesRequest;