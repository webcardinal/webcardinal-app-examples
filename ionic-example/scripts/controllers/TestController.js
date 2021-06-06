const { WebcIonicController } = WebCardinal.controllers;

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

    },
        {
            continentName: "Asia", countries: [
                {
                    value: "China",
                    placeholder: 'Country',
                    type: 'text',
                }, {
                    value: "Indonesia",
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

    artists:[{
            value: "picasso",
            name: "Pablo Picasso",
            checked: true,
        },
        {
            value: "gogh",
            name: "Van Gogh",
            checked: false,
        }],
    date:{
        "display-format":"DD/MM/YYYY",
        value:new Date(1628735304708).toISOString(),
        placeholder: "Select date"
    },
    time:{
        "display-format": "h:mm A",
        "minute-values":"0,15,30,45",
        value:new Date(1628734000000).toISOString(),
        placeholder: "Select time"
    },
    daysOfTheWeek:{
        value:"tuesday",
        options: [{
            optionName: "Monday",
            value: "monday",
        },
            {
                optionName: "Tuesday",
                value: "tuesday",
            },
            {
                optionName: "Saturday",
                value: "saturday",
            }
        ]
    },
    pepperoni:{
        checked:true,
        value:"pepperoni",
        name:"Pepperoni"
    },
    brightness:{
        min:10,
        value:50,
        max:90,
    },
    range: {
        min:10,
        max:90,
        value: {
            lower: 10,
            upper: 75
        }
    }
}

export default class TestController extends WebcIonicController {

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

        this.model.onChange("artists",()=>{
            console.log("Artists:",this.model.artists.filter(artist=>artist.checked));
        });

        this.model.onChange("daysOfTheWeek",()=>{
            console.log(this.model.daysOfTheWeek);
        })
    }

}
