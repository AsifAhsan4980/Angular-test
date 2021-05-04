(function(window) {
	window.env = window.env || {};

	// Environment variables
	window["env"]["apiUrl"] = "${apiUrl}";
	window["env"]["apiUrlAWS"] = "${apiUrlAWS}";
	window["env"]["apiUrlAWSAuth"] = "${apiUrlAWSAuth}";
	window["env"]["apiUrlContact"] = "${apiUrlContact}";
	window["env"]["apiUrlLocation"] = "${apiUrlLocation}";
	window["env"]["apiProductSettings"] = "${apiProductSettings}";
	window["env"]["apiInventorySetup"] = "${apiInventorySetup}";
	window["env"]["apiPurchase"] = "${apiPurchase}";
	window["env"]["apiMasterSetup"] = "${apiMasterSetup}";
	window["env"]["apiUser"] = "${apiUser}";
	window["env"]["apiCluster"] = "${apiCluster}";
	window["env"]["apiAccounting"] = "${apiAccounting}";
	window["env"]["debug"] = "${DEBUG}";
})(this);