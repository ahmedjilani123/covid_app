sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator"
], (Controller,BusyIndicator) => {
    "use strict";

    return Controller.extend("ca.covidapp.controller.View1", {
        dataPath:"https://api.rootnet.in/covid19-in/stats/latest",
        onInit () {
            // BusyIndicator.show();
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData(this.dataPath); 
            this.getView().setModel(oModel, "covidData");
            oModel.attachRequestCompleted(()=>{
                 BusyIndicator.hide();
             var pieChart =[];
                oModel.getData().data.regional.forEach((item,i)=>{
if(i<4){
    pieChart.push({
        "loc":item.loc,
        "Cases":item.totalConfirmed
    });
}
                });
             oModel.setProperty("/pie",pieChart);
            });

            var vizframe = this.getView().byId("vizframeId");
            vizframe.setVizProperties({
                title: {
                    text: "4 Main States"
                },
                plotArea: {
                    colorPalette: ["#F99417","#d3321d","#f756aa","#a106f4"],
                    drawingEffect: "glossy",
                    background:{
                        color:"#cad0ff"
                    }
                },
                legendGroup: {
                    layout: {
                        position: "bottom"
                    },
                    computedVisibility:false,
                    forceToShow:false
                },
                general:{
                    background:{
                        color:"#cad0ff"
                    }
                }
            })
        },
        getAllData:function(){
            var data = this.getView().getModel("covidData").getData();
            this.Dialog ??= new sap.ui.xmlfragment("ca.covidapp.fragment.allData", this);
            this.getView().addDependent(this.Dialog);

            this.Dialog.open();
        },
        CloseDialogPress:function(oEvent){
            oEvent.getSource().getParent().getParent().close();
            this.Dialog=undefined;
        },
        AvatarPress:function(){
            sap.m.MessageToast.show("Avatar Pressed");
        }
    });
});