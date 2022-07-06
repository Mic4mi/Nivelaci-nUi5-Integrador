sap.ui.define([
    'sap/ui/test/Opa5',
    'sap/ui/test/matchers/AggregationLengthEquals',
    'sap/ui/test/matchers/I18NText',
    'sap/ui/test/matchers/BindingPath',
    'sap/ui/test/actions/Press',
    'sap/ui/test/actions/EnterText'
],
    function (Opa5, AggregationLengthEquals, I18NText, BindingPath, Press, EnterText) {
        "use strict";

        var sViewName = "Home",
            sTableId = "idOrdersTable";

        Opa5.createPageObjects({
            onTheHomePage: {
                actions: {
                    iPressOnTheItemWithTheID: function (iOrderId) {
                        return this.waitFor({
                            controlType: "sap.m.ColumnListItem",
                            viewName: sViewName,
                            matchers: new BindingPath({
                                path: `/Orders(${iOrderId})`,
                                modelName: 'ordersModel'
                            }),
                            actions: new Press(),
                            errorMessage: "No item with the ID " + iOrderId + " was found."
                        });
                    },

                },

                assertions: {
                    theTableShouldHavePagination: function () {
                        return this.waitFor({
                            id: sTableId,
                            viewName: sViewName,
                            matchers: new AggregationLengthEquals({
                                name: "items",
                                length: 20
                            }),
                            success: function () {
                                Opa5.assert.ok(true, "The table has 20 items on the first page");
                            },
                            errorMessage: "The table does not contain all items."
                        });
                    },

                    iShouldSeeTheTable: function () {
                        return this.waitFor({
                            id: sTableId,
                            viewName: sViewName,
                            success: function () {
                                Opa5.assert.ok(true, "The table is visible");
                            },
                            errorMessage: "Was not able to see the table."
                        });
                    }
                }
            }
        });

    });
