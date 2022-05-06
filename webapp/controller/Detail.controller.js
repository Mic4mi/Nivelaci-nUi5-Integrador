sap.ui.define([
    "acc/orders/controller/BaseController",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("acc.orders.controller.Detail", {
            onInit: function () {
                this.getRouter().getRoute(this.constants.routes.detail).attachPatternMatched(this._onObjectMatched, this);
            },

            /**
             * Binds the view to the object path and expands the aggregated line items.
             * @function
             * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
             * @private
             */
            _onObjectMatched: function (oEvent) {
                let sObjectId = oEvent.getParameter("arguments").OrderID;
                this.currentObjectPath = sObjectId;
                let sPath = "/" + this.currentObjectPath;
                this.getOdataService().read(sPath)
                    .then((oRetrievedResult) => {
                        this.currentItem = oRetrievedResult;
                        this.setModelInOwnerComponent(this.currentItem, this.constants.paths.orderDetailsModel)
                    })
                    .then(() => {
                        // Con esta función, deberíamos obtener los datos para nuestro Customer
                        // En el callback de success, invocamos una función que carga el modelo para nuestra entity
                        // customer en el ownerComponent
                        this.getDataFromService(
                            `Customers('${this.currentItem.CustomerID}')`,
                            function (oRetrievedResult) {
                                this.setModelInOwnerComponent(
                                    oRetrievedResult,
                                    this.constants.paths.customerDetailsModel
                                )
                            }.bind(this),
                            function (oError) {
                                MessageToast.show("Error al generar el modelo para Customers: " + oError);
                            }.bind(this)
                        );
                    })
                    .catch((oError) => {
                        MessageToast.show("Error al encontrar el ítem: " + oError);
                    });
            },


            /**
             * Method to navigate back and clean current data from detail model
             */
            navBackAndCleanDetailModels: function () {
                this.onNavBack();
                this.getOwnerComponent().getModel(this.constants.paths.orderDetailsModel).setData([]);
                this.getOwnerComponent().getModel(this.constants.paths.customerDetailsModel).setData([]);
            }


        });
    });
