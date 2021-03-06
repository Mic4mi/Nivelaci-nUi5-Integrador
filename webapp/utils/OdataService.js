sap.ui.define([
    "sap/ui/base/Object"
], function (Object) {
    "use strict";
    return Object.extend("acc.orders.util.OdataService", {
        constructor: function (model) {
            this.model = model;
        },
        returnData: function (resolve, reject, mParameters) {
            return {
                parameters: !!mParameters ? mParameters.parameters : '',
                filters: !!mParameters ? mParameters.filters : '',
                sorters: !!mParameters ? mParameters.sorters : '',
                urlParameters:  !!mParameters ? mParameters.urlParameters : '',
                success: function (data, response) {
                    resolve(data, response);
                },
                error: function (oError) {
                    reject(oError);
                }
            };
        },
        create: function (sPath, payload, mParameters) {
            return new Promise(function (resolve, reject) {
                this.model.create(sPath, payload, this.returnData(resolve, reject, mParameters));
            }.bind(this));
        },
        read: function (sPath, mParameters) {
            return new Promise(function (resolve, reject) {
                this.model.read(sPath, this.returnData(resolve, reject, mParameters));
            }.bind(this));
        },
        update: function (sPath, payload, mParameters) {
            return new Promise(function (resolve, reject) {
                this.model.update(sPath, payload, this.returnData(resolve, reject, mParameters));
            }.bind(this));
        },
        delete: function (sPath) {
            return new Promise(function (resolve, reject) {
                this.model.remove(sPath, this.returnData(resolve, reject));
            }.bind(this));
        }
    });
});