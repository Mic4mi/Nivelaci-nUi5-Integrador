sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/matchers/Properties',
	'sap/ui/test/actions/Press'
], function (Opa5, Properties, Press) {
	"use strict";

	var sViewName = "Detail";

	Opa5.createPageObjects({
		onTheDetailPage: {
			actions: {
				iPressTheBackButton: function () {
					return this.waitFor({
						id: "DetailPage",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Did not find the nav button on object page"
					});
				}
			},

			assertions: {
				iShouldSeeTheDetailForOrder: function (sOrderId) {
					return this.waitFor({
						id: "orderInfoContent1",
						viewName: sViewName,
						matchers: new Properties({
							text: sOrderId
						}),
						success: function () {
							Opa5.assert.ok(true, "Success!!!!");
						},
						errorMessage: "The detail of the order " + sOrderId + " is not shown"
					});
				},

				theTitleShouldDisplayTheName: function (sTitlename) {
					return this.waitFor({
						id: "headerTolbar",
						viewName: "Home",
						matchers: new Properties({
							title: sTitlename
						}),
						success: function () {
							Opa5.assert.ok(true, "Success!!!");
						},
						errorMessage: "The main page is not shown"
					});
				},

				iShouldSeeTheForm: function () {
					return this.waitFor({
						id: "ordersForm",
						success: function () {
							Opa5.assert.ok(true, "Success!!!");
						},
						errorMessage: "Error :("
					});
				}
			}
		}
	});
});
