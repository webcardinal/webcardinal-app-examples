import CardinalController from "/cardinal/base/controllers/ContainerController.js";

class RegisterController extends CardinalController {
    constructor(element, history) {
        super(element, history);

        const backElement = this.element.querySelector('ion-back-button');
        backElement.addEventListener('click', () => this.History.history.goBack());
    }
}

export default RegisterController;