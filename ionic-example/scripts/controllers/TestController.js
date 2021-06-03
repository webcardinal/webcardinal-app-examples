import IonicController from "./IonicController.js";

let model = {
    input: {
        value: 'john.doe@example.com',
        placeholder: 'EMAIL',
        type: 'email',
        inputmode: 'email',
        required: true
    },

    array: [{
        continentName: "Europe", countries: [
            {
                value: "Romania",
                placeholder: 'Country',
                type: 'text',
            }, {
                value: "Germany",
                placeholder: 'Country',
                type: 'text',
            }]

    }],
    pets:{
       value:["cat","dog"],
       options:[ {
            value:"dog",
            name:"Dog"
        },
        {
            value:"cat",
            name:"Cat"
        }]
    },
    date:{
        displayFormat:"DD/MM/YYYY",
        value:new Date(1628735304708).toISOString(),
        placeholder: "Select date"
    },
    time:{
        displayFormat: "h:mm A",
        minuteValues:"0,15,30,45",
        value:new Date(1628735304708).toISOString(),
        placeholder: "Select time"
    }
}

export default class TestController extends IonicController {


    constructor(...props) {
        super(...props);
        this.model = model;

        setTimeout(()=>{
            this.model.array[0].countries[0].value="France"
        },3000)

        this.model.onChange("pets",()=>{
            console.log("pets", this.model.pets)
        })

        this.model.onChange("date",()=>{
            console.log("Date", this.model.date.value)
        })
        this.model.onChange("time",()=>{
            console.log("Time", this.model.time.value)
        })
    }


}