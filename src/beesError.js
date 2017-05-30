class beesError {
    constructor(error) {
        this.message = error.message || "";
        this.code = error.code || 0;
        this.isAborted = error.isAborted===true;
    }
}

module.exports = beesError;