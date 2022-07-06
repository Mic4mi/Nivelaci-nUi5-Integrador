/*global QUnit*/

sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/Home",
    "./pages/Browser",
    "./pages/Detail"
], function (opaTest) {
    "use strict";

    QUnit.module("Order Detail");

    opaTest("Should see the post page when a user clicks on an entry of the list", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        //Actions
        When.onTheHomePage.iPressOnTheItemWithTheID("10248");

        // Assertions
        Then.onTheDetailPage.iShouldSeeTheDetailForOrder("10248");
    });

    opaTest("Should go back to the TablePage", function (Given, When, Then) {
        // Actions
        When.onTheDetailPage.iPressTheBackButton();

        // Assertions
        Then.onTheHomePage.iShouldSeeTheTable();
    });

    // Revisar: Aun no he logrado poder simular presionar el botón de navegación de chrome
    // opaTest("Should be on the post page again when the browser's forward button is pressed", function (Given, When, Then) {
    //     // Actions
    //     When.onTheBrowser.iPressOnTheForwardButton();

    //     // Assertions
    //     Then.onTheDetailPage.iShouldSeeTheForm();

    //     // Cleanup
    //     Then.iTeardownMyApp();
    // });
}
);
