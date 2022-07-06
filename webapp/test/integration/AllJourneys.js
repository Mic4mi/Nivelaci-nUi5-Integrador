sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./HomeJourney",
	"./DetailJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "acc.orders.view.",
		autoWait: true,
		timeout: 30
	});
});
