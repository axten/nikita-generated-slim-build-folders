define('test', ['app', 'node-logging-js'], function(app, logging)
{
	var Test = function()
	{
		logging.applyLogging(this, 'Test');

        console.log('test', arguments);

		this.initializeEventListeners();
	};

	Test.prototype.initializeEventListeners = function()
	{

	};

	return new Test();
});