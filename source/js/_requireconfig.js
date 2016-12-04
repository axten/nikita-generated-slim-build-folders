requirejs({
	"baseUrl": "./js/",
	"noGlobal": true,
	"paths": {
		"logging": "../../node_modules/node-logging-js/logging"
	},
	"shim": {
	},
	"include": [
		'app'
	]
})
