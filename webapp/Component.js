sap.ui.define([
    "sap/ui/core/UIComponent",
    "ca/covidapp/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models,JSONModel) => {
    "use strict";

    return UIComponent.extend("ca.covidapp.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            var data =[
                {
                    label:"A",
                    value:12
                },
                {
                    label:"B",
                    value:12
                },
                {
                    label:"C",
                    value:12
                },
                {
                    label:"D",
                    value:12
                },
            ]
var model = new JSONModel(data);
this.setModel(model,"change");
            // enable routing
            this.getRouter().initialize();
        }
    });
});