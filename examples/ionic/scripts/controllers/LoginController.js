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
            localStorage.removeItem('live-mode');
            window.handleRoot();
        });
    }
}

customElements.define('login-popover', LoginPopover);

class LoginController extends CardinalController {
    getModel = () => ({
        header: {
            intro: {
                innerText: 'WELCOME TO',
                class: 'intro'
            },
            title: {
                innerHTML: `Mobile<br>Application`,
                class: 'title'
            },
            options: {
                innerHTML:
                    `<ion-button id="menu">
                        <ion-icon slot="icon-only" name="ellipsis-vertical"></ion-icon>
                    </ion-button>`,
                slot: 'end'
            }
        }
    })

    async handleMenuClick(event) {
        const popover = Object.assign(document.createElement('ion-popover'), {
            component: 'login-popover',
            event,
            translucent: true
        });
        document.body.appendChild(popover);
        return popover.present();
    }

    async handleLoginClick(event) {
        event.stopImmediatePropagation();

        const loading = document.createElement('ion-loading');

        loading.message = 'Please wait...';
        loading.duration = 1500;

        document.body.appendChild(loading);

        await loading.present();
        await loading.onDidDismiss();

        location.pathname = '/demo';
    }

    async handleOnReady() {
        const menuElement = this.element.querySelector('#menu');
        const loginButtonElement = this.element.querySelector('#login');

        menuElement.addEventListener('click', this.handleMenuClick.bind(this));
        loginButtonElement.addEventListener('click', this.handleLoginClick.bind(this));
    }

    constructor(element, history) {
        super(element, history);

        this.model = this.setModel(this.getModel());

        element.componentOnReady().then(this.handleOnReady.bind(this));
    }
}

export default LoginController;