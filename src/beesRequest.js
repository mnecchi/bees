class beesRequest {
    constructor(request) {
        this.abort = () => { request.abort(); };
    }
}

module.exports = beesRequest;