sap.ui.define([
    "acc/orders/controller/BaseController",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        Device,
        Filter,
        FilterOperator,
        Sorter
    ) {
        "use strict";

        return Controller.extend("acc.orders.controller.Home", {
            onInit: function () {

            },

            /**
             * Method to navigate to detail page
             * @param {sap.ui.base.Event} oEvent 
             */
            onNavigateToDetail: function (oEvent) {
                let oItem = oEvent.getSource(),
                    bReplace = !Device.system.phone;
                this.navTo(this.constants.routes.detail, {
                    OrderID: oItem.getBindingContextPath().substring(1)
                }, bReplace);
            },

            /**
             * Applies the controller filters to a certain component, such as a table or list
             * @param {sap.m.table} oTable 
             * @param {Array} aFilters 
             */
            onFilterChange: function (oTable, aFilters) {
                let oBinding = oTable.getBinding("items"),
                    oFilter;

                if (aFilters) {
                    oFilter = new Filter(aFilters, true);
                    oBinding.filter(oFilter, "Application");
                }
            },

            /**
             * 
             * Obtain all filters from this view
             */
            getFilters: function () {
                let aFilters = [];

                if (this.oSearchShipName) {
                    aFilters.push(this.oSearchShipName);
                }

                return aFilters;
            },

            /**
             * Generates a filter for a search field
             * @param {string} sField 
             * @param {string} sQuery 
             * @param {sap.ui.model.FilterOperator} oFilterOperator 
             */
            getSearchFilter: function (sField, sQuery, oFilterOperator) {
                let oFilter;
                if (sQuery) {
                    oFilter = new Filter(sField, oFilterOperator, sQuery);
                } else {
                    oFilter = null;
                }
                return oFilter;
            },

            /**
             * Create a filter for the ShipName field
             * @param {sap.ui.base.Event} oEvent 
             */
            onSearchShipName: function (oEvent) {
                this.oSearchShipName = this.getSearchFilter(
                    this.constants.filterFields.ShipName,
                    oEvent.getSource().getValue(),
                    FilterOperator.Contains
                );
                this.onFilterChange(this.byId(this.constants.ids.idOrdersTable), this.getFilters());
            },

            /**
             * Method to open a popup
             */
            onOpenSortPopUp: function () {
                this.openDialog(
                    this.byId(this.constants.ids.sortDialog),
                    this.getView(), this.constants.fragments.sort
                );
            },

            /**
             * Method to confirm sorting
             * @param {sap.ui.base.Event} oEvent 
             */
            onSortOrdersConfirm: function (oEvent) {
                let oMParams = oEvent.getParameters(),
                    oTable = this.byId(this.constants.ids.idOrdersTable),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    oSorter,
                    bDescending;

                sPath = oMParams.sortItem.getKey();
                bDescending = oMParams.sortDescending;
                oSorter = new Sorter(sPath, bDescending);
                oBinding.sort(oSorter);
            }

        });
    });
