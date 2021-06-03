
const { Controller } = WebCardinal.controllers;


//bindingElements

 const ionEventsChainMappings = [{
    eventName: "ionChange",
    chainTriggered: "value"
}]

export default class IonicController extends Controller {

    constructor(...props) {
        super(...props);
        let constructorElement = props[0];


        ionEventsChainMappings.forEach((ionEventChainMapping)=>{
           let eventName = ionEventChainMapping.eventName;
           let chainTriggered = ionEventChainMapping.chainTriggered;

           constructorElement.addEventListener(eventName,(event)=>{
                let eventSource = event.target;
                let eventValue = event.target.value;

                let attributeValue;
                switch (true){
                    case eventSource.hasAttribute("data-view-model") :
                        attributeValue= eventSource.getAttribute("data-view-model");
                        break;
                    case eventSource.hasAttribute("ion-binding") :
                        attributeValue= eventSource.getAttribute("ion-binding");
                        break;
                    default:
                        return;
                }

               let modelChain = attributeValue.split("@").join("");

                console.log(chainTriggered)
                if(chainTriggered!=="@"){
                    modelChain = `${modelChain}.${chainTriggered}`;
                }
                console.log(modelChain);
                this.model.setChainValue(modelChain, eventValue)

            });
        });

    }

}