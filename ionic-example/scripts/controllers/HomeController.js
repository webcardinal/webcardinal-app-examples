const { Controller } = WebCardinal.controllers;

class HomeController extends Controller {
    initializeModel = () => ({
        welcome: 'Welcome to HomePage ⭐'
    })

    constructor(element, history) {
        super(element, history);
        this.setModel(this.initializeModel());
    }
}

export default HomeController;