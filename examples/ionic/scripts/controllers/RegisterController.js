const { Controller } = WebCardinal.controllers;

class RegisterController extends Controller {
    constructor(element, history) {
        super(element, history);

        this.onTagClick('back', _ => history.goBack());
    }
}

export default RegisterController;
