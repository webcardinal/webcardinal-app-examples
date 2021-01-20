const { Controller } = WebCardinal.controllers;

class ApplicationController extends Controller {
    getModel = _ => ({
        schedules: [],
        actions: {
            schedule: {
                add: {
                    innerHTML: 'Add <ion-icon name="add-circle-outline" slot="start"></ion-icon>',
                    expand: 'block',
                    color: 'success',
                    id: 'add-button'
                },
                remove: {
                    innerHTML: 'Remove <ion-icon name="remove-circle-outline" slot="end"></ion-icon>',
                    expand: 'block',
                    color: 'danger',
                    disabled: true,
                    id: 'delete-button'
                }
            }
        }
    })

    constructor(element) {
        super(element);

        this.setModel(this.getModel());
        this.model.addExpression('scheduleCounter', _ => ({
          innerText: this.model.schedules.length
        }), 'schedules');
        this.model.onChange('schedules', _ => {
            this.model.actions.schedule.remove.disabled = this.model.schedules.length === 0
        })
    }

    async onReady() {
        const addScheduleButton = this.element.querySelector('#add-button');
        const removeScheduleButton = this.element.querySelector('#delete-button');

        addScheduleButton.addEventListener('click', e => {
            e.preventDefault();
            let index = this.model.schedules.length + 1;
            this.model.schedules.push(`[${index}] Lorem...`);
        })
        removeScheduleButton.addEventListener('click', e => {
            e.preventDefault();
            this.model.schedules.shift();
        })
    }
}

export default ApplicationController;