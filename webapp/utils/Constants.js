sap.ui.define(
    [],
    function () {
        "use strict";

        let Constants = {
            paths: {
                ROOT: "acc.orders",
                ordersModel: "ordersModel",
                orderDetailsModel: 'orderDetailsModel',
                customerDetailsModel: 'customerDetailsModel'
            },

            filterFields: {
                ShipName: "ShipName"
            },
            ids: {
                idOrdersTable: "idOrdersTable",
                sortDialog: "sortDialog"
            },

            fragments: {
                sort: "acc.orders.view.fragments.sorterPopup"
            },
            routes: {
                home: 'Home',
                detail: 'Detail'
            },
        };
        return Constants;
    },
    true
);