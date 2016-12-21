define('test', ['app', 'node-jsb', 'node-logging-js'], function(app, jsb, logging)
{
	var Test = function()
	{
		logging.applyLogging(this, 'Test');

        this.logInfo('init', arguments);
		this.initializeEventListeners();
	};

	Test.prototype.initializeEventListeners = function()
	{

	};

    jsb.registerHandler('Test', Test);
	return Test;
});
