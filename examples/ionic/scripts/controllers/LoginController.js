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
                innerHTML: `
                    <ion-button id="menu">
                        <ion-icon slot="icon-only" name="ellipsis-vertical"></ion-icon>
                    </ion-button>`,
                slot: 'end'
            }
        },
        content: {
            intro: {
                innerHTML: `<ion-label class="intro">Stay in touch with Us!</ion-label>`,
                color: 'primary'
            },
            email: {
                icon: {
                    name: 'person-circle',
                    slot: 'start'
                },
                input: {
                    value: 'john.doe@example.com',
                    placeholder: 'EMAIL',
                    type: 'email',
                    inputmode: 'email',
                    required: true
                }
            },
            password: {
                icon: {
                    name: 'lock-closed',
                    slot: 'start'
                },
                input: {
                    value: 'test1234',
                    placeholder: 'PASSWORD',
                    type: 'password',
                    required: true
                },
                show: {
                    id: 'view-password',
                    name: 'eye-outline',
                    slot: 'end',
                    style: 'cursor: pointer'
                },
                hide: {
                    name: 'eye-off-outline'
                }
            },
            'remember-me': {
                innerHTML: `
                    <ion-checkbox slot="start" checked></ion-checkbox>
                    <ion-label>Remember me!</ion-label>`,
                lines: 'none',
                style: 'padding-bottom: 2em'
            }
        },
        footer: {
            login: {
                expand: 'block',
                style: 'padding: 0 1em',
                id: 'login',
                innerHTML: 'Login <ion-icon slot="end" name="log-in"></ion-icon>'
            },
            register: {
                innerText: `I don't have an account yet!`,
                href: '/register'
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

    async showPassword(event) {
        event.stopImmediatePropagation();
        event.target.parentElement.children[1].type = 'text';
        event.target.setAttribute('name', this.model.content.password.hide.name);
    }

    async hidePassword(event) {
        event.stopImmediatePropagation();
        event.target.parentElement.children[1].type = 'password';
        event.target.setAttribute('name', this.model.content.password.show.name);
    }

    async togglePassword(event) {
        if (event.target.getAttribute('name') === this.model.content.password.hide.name) {
            await this.hidePassword(event);
        } else {
            await this.showPassword(event);
        }
    }

    async handleOnReady() {
        const menuElement = this.element.querySelector('#menu');
        const loginButtonElement = this.element.querySelector('#login');
        const viewElement = this.element.querySelector('#view-password');

        menuElement.addEventListener('click', this.handleMenuClick.bind(this));
        loginButtonElement.addEventListener('click', this.handleLoginClick.bind(this));

        if ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) {
            viewElement.addEventListener('touchstart', this.togglePassword.bind(this))
        } else {
            viewElement.addEventListener('mousedown', this.showPassword.bind(this));
            viewElement.addEventListener('mouseup', this.hidePassword.bind(this));
        }

        // TODO: two-way binding
        // let value = 0;
        // loginButtonElement.addEventListener('click', () => {
        //     this.model.header.title = `${++value}`;
        // })
    }

    constructor(element, history) {
        super(element, history);

        this.model = this.setModel(this.getModel());

        // <wcc-bindable> loaded
        element.componentOnReady().then(this.handleOnReady.bind(this));
    }
}

export default LoginController; // used by <wcc-bindable>