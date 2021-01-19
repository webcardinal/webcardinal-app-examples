const { Controller } = WebCardinal.controllers;

class RegisterController extends Controller {
    constructor(element) {
        super(element);
    }

    async onReady() {
        const backElement = this.element.querySelector('ion-back-button');
        backElement.addEventListener('click', _ => history.back());
    }
}

export default RegisterController;
