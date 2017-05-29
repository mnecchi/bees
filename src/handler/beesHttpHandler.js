if(typeof XMLHttpRequest !== 'undefined') {
    module.exports = require('./beesXmlHttp');
} else {
    module.exports = require('./beesHttp');
}