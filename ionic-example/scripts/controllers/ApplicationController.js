const { Controller } = WebCardinal.controllers;

class ApplicationController extends Controller {
    initializeModel = () => ({
        schedules: [],
        actions: {
            schedule: {
                add: {
                    html: 'Add <ion-icon name="add-circle-outline" slot="start"></ion-icon>',
                    expand: 'block',
                    color: 'success',
                    tag: 'add-button'
                },
                remove: {
                    html: 'Remove <ion-icon name="remove-circle-outline" slot="end"></ion-icon>',
                    expand: 'block',
                    color: 'danger',
                    disabled: true,
                    tag: 'delete-button'
                }
            }
        }
    })

    constructor(element, history) {
        super(element, history);

        this.setModel(this.initializeModel());

        const { schedules } = this.model;
        const { schedule } = this.model.actions;

        this.model.onChange('schedules', _ => {
            schedule.remove.disabled = schedules.length === 0
        });

        this.model.addExpression('scheduleCounter', _ => ({
            text: schedules.length
        }), 'schedules');

        this.onTagClick(schedule.add.tag, (model, target, event) => {
            event.preventDefault();
            let index = schedules.length + 1;
            schedules.push(`[${index}] Lorem...`);
        });

        this.onTagClick(schedule.remove.tag, (model, target, event) => {
            event.preventDefault();
            schedules.shift();
        });
    }
}

export default ApplicationController;