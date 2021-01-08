import CardinalController from "/webcardinal/base/controllers/ContainerController.js";

class LoginPopover extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
          <ion-content>
            <ion-list>
              <ion-list-header><ion-label>Information</ion-label></ion-list-header>
              <ion-item>About</ion-item>
              <ion-item button lines="none"><ion-label>Showcase mode</ion-label></ion-item>
            </ion-list>
          </ion-content>
        `;

        const button = this.querySelector('ion-item[button]');
        button.addEventListener('click', () => {
            // document.body.removeAttribute('live-mode');
            localStorage.removeItem('live-mode');
            window.handleRoot();
        });
    }
}

customElements.define('login-popover', LoginPopover);

class LoginController extends CardinalController {
    getIonicApp(element) {
        while (element && element.tagName.toLowerCase() !== 'ion-app') {
            element = element.parentElement;
        }
        return element;
    }

    async handleMenuClick(event) {
        const popover = Object.assign(document.createElement('ion-popover'), {
            component: 'login-popover',
            event,
            translucent: true
        });
        document.body.appendChild(popover);
        return popover.present();
    }

    async handleLoginClick() {
        const loading = document.createElement('ion-loading');

        loading.message = 'Please wait...';
        loading.duration = 1500;

        document.body.appendChild(loading);

        await loading.present();
        await loading.onDidDismiss();

        location.pathname = '/demo';
    }

    constructor(element, history) {
        super(element, history);

        const menuElement = element.querySelector('#menu');
        const loginButtonElement = element.querySelector('#login');
        this.root = this.getIonicApp(menuElement);
        menuElement.addEventListener('click', this.handleMenuClick.bind(this));
        loginButtonElement.addEventListener('click', this.handleLoginClick.bind(this));
    }
}

export default LoginController;