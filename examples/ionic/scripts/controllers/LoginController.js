import ContainerController from "/cardinal/base/controllers/ContainerController.js";

class LoginPopover extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
          <ion-content>
            <ion-list>
              <ion-list-header><ion-label>Settings</ion-label></ion-list-header>
              <ion-item>About</ion-item>
              <ion-item button lines="none"><ion-label>Showcase mode</ion-label></ion-item>
            </ion-list>
          </ion-content>
        `;

        const button = this.querySelector('ion-item[button]');
        button.addEventListener('click', () => {
            document.body.removeAttribute('live-mode');
            window.handleRoot();
        });
    }
}

customElements.define('login-popover', LoginPopover);

class LoginController extends ContainerController {
    handleMenuClick(event) {
        const popover = Object.assign(document.createElement('ion-popover'), {
            component: 'login-popover',
            event,
            translucent: true
        });
        document.body.appendChild(popover);
        return popover.present();
    }

    getIonicRoot(element) {
        while (element && element.tagName.toLowerCase() !== 'ion-app') {
            element = element.parentElement;
        }
        return element;
    }

    constructor(element, history) {
        super(element, history);

        const menuElement = element.querySelector('#menu');
        this.root = this.getIonicRoot(menuElement);
        menuElement.addEventListener('click', this.handleMenuClick.bind(this));
    }
}

export default LoginController;