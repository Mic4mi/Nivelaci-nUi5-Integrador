/*global QUnit*/

sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/Home"
], function (opaTest) {
    "use strict";

    QUnit.module("List of orders");

    opaTest("Should see the table with all orders", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Assertions
        Then.onTheHomePage.theTableShouldHavePagination();

        // Cleanup
        Then.iTeardownMyApp();
    });
}
);
