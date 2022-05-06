sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/routing/History",
        "sap/ui/core/UIComponent",
        "sap/ui/core/Fragment",
        "sap/ui/Device",
        "sap/m/library",
        "acc/orders/utils/Formatter",
        "acc/orders/utils/Constants",
        "acc/orders/utils/OdataService"
    ],
    function (
        Controller,
        JSONModel,
        History,
        UIComponent,
        Fragment,
        Device,
        mLibrary,
        Formatter,
        Constants,
        OdataService
    ) {
        "use strict";

        return Controller.extend("acc.orders.controller.BaseController", {
            formatter: Formatter,
            constants: Constants,
            _mViewSettingsDialogs: {},

            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} sName the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.mvc.View} the view instance
             */
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            /**
             * 
             * @param {string} sText 
             */
            getTextFor: function (sText) {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText);
            },

            /**
             * Method for navigation to specific view
             * @public
             * @param {string} psTarget Parameter containing the string for the target navigation
             * @param {Object.<string, string>} pmParameters? Parameters for navigation
             * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
             */
            navTo: function (psTarget, pmParameters, pbReplace) {
                this.getRouter().navTo(psTarget, pmParameters, pbReplace);
            },

            /**
             * Method for get the router
             */
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            /**
             * Method for navigate back
             */
            onNavBack: function () {
                var sPreviousHash = History.getInstance().getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.getRouter().navTo(this.constants.routes.home, {}, true /*no history*/);
                }
            },

            /**
             * Method for using Odata Services.
             * @public
             * @returns the oData Service
             */
            getOdataService: function () {
                if (!this._odataService) {
                    this._odataService = new OdataService(
                        this.getOwnerComponent().getModel(this.constants.paths.ordersModel)
                    );
                }
                return this._odataService;
            },

            /**
             * Event handler for the filter, sort and group buttons to open the ViewSettingsDialog.
             * @param {string} sDialogFragmentName
             * @public
             */
            getViewSettingsDialog: function (sDialogFragmentName) {
                let pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        if (Device.system.desktop) {
                            oDialog.addStyleClass("sapUiSizeCompact");
                        }
                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            },

            /**
             * Method to generate a popover
             */
            _getMessagePopover: function (sFragmentPath) {
                var oView = this.getView();

                // create popover lazily (singleton)
                if (!this._pMessagePopover) {
                    this._pMessagePopover = Fragment.load({
                        id: oView.getId(),
                        name: sFragmentPath
                    }).then(function (oMessagePopover) {
                        oView.addDependent(oMessagePopover);
                        return oMessagePopover;
                    });
                }
                return this._pMessagePopover;
            },

            /**
             * Method to open a viewSettingsDialog with custom search operator
             * @param {sap.m.Dialog} oDialog
             * @param {string} sFrgamentId
             * @public
             */
            openSettingsDialogWithContainsSearch: function (oDialog, sFrgamentId) {
                try {
                    if (!oDialog) {
                        this.getViewSettingsDialog(sFrgamentId)
                            .then(function (oViewSettingsDialog) {
                                this.getView().addDependent(oViewSettingsDialog);
                                oViewSettingsDialog
                                    .setFilterSearchCallback(null)
                                    .setFilterSearchOperator(mLibrary.StringFilterOperator.Contains)
                                    .open();
                            }.bind(this));
                    } else {
                        oDialog
                            .setFilterSearchCallback(null)
                            .setFilterSearchOperator(mLibrary.StringFilterOperator.Contains)
                            .open();
                    }
                } catch (oError) {
                    console.log(`${console.log(this.getTextFor("errWhileOpenPopup"))}: ${oError}`);
                }
            },

            /**
             * Method to open a popup
             * @param {sap.m.Dialog} oDialog
             * @param {string} sFrgamentId
             * @public
             */
            openSettingDialog: function (oDialog, sFrgamentId) {
                try {
                    if (!oDialog) {
                        this.getViewSettingsDialog(sFrgamentId)
                            .then(function (oViewSettingsDialog) {
                                this.getView().addDependent(oViewSettingsDialog);
                                oViewSettingsDialog.open();
                            }.bind(this));
                    } else {
                        oDialog.open();
                    }
                } catch (oError) {
                    console.log(`${console.log(this.getTextFor("errWhileOpenPopup"))}: ${oError}`);
                }
            },

            /**
             * Method to open a popup
             * @param {sap.m.Dialog} oCurrentDialog the dialog that we need to work with
             * @param {object} oCurrentView referst to the current view
             * @param {string} sDialogPath the folder path to fragment
             */
            openDialog: function (oCurrentDialog, oCurrentView, sDialogPath) {
                if (!oCurrentDialog) {
                    oCurrentDialog = Fragment.load({
                        id: oCurrentView.getId(),
                        name: sDialogPath,
                        controller: this
                    }).then(function (oDialog) {
                        oCurrentView.addDependent(oDialog);
                        oDialog.open();
                        return oDialog;
                    });
                } else {
                    oCurrentDialog.open();
                }
            },

            /**
             * Allows to obtain data of a certain entity from a service
             * @param {String} sEntityName The entity name that we need to get from the service
             * @param {callback} fnSuccess 
             * @param {callback} fnError 
             */
            getDataFromService: function (sEntityName, fnSuccess, fnError) {
                this.getOdataService().read(`/${sEntityName}`)
                    .then(oResponse => {
                        fnSuccess(oResponse)
                    })
                    .catch(oError => {
                        fnError(oError)
                    });
            },

            /**
             * Sets up a model with data in the owner component
             * @param {Object} oDataRecieved 
             * @param {String} sModelName 
             */
            setModelInOwnerComponent: function (oData, sModelName) {
                let oModel = new JSONModel();
                oModel.setData(oData);
                this.getOwnerComponent().setModel(oModel, sModelName);
            },

        });
    }
);