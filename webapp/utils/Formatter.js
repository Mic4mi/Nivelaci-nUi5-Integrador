sap.ui.define([], function () {
    "use strict";
    return {
        formatDate: function (oDate) {
            return `${oDate.getDay()}/${oDate.getMonth()}/${oDate.getFullYear()}`
        }
    };
});