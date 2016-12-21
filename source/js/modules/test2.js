var app = require('app');
var logging = require('node-logging-js');
import jsb from 'node-jsb';
// both ways are working


class test2 {
    constructor() {
        logging.applyLogging(this, 'Test2');

		this.logInfo('init', arguments);
        this.initializeEventListeners();
    }

    initializeEventListeners() {
		//tracing logs are not working
    }
}

jsb.registerHandler('Test2', test2);
export default test2;
