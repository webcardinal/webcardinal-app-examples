const { Controller } = WebCardinal.controllers;

class LoginPopover extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <style>ion-label { padding-left: 1rem }</style>
          <ion-content>
            <ion-list-header lines="full">
               <ion-label>👋</ion-label>
               <ion-button button>Showcase mode</ion-button>
            </ion-list-header>
            <ion-list>
              <ion-item button>About</ion-item>
              <ion-item button lines="none">Development<ion-label></ion-label></ion-item>
            </ion-list>
          </ion-content>
        `;

        const button = this.querySelector('ion-button');
        button.addEventListener('click', () => {
            localStorage.removeItem('live-mode');
            window.handleRoot();
        });
    }
}

customElements.define('login-popover', LoginPopover);

class LoginController extends Controller {
    initializeModel = () => ({
        header: {
            intro: {
                text: 'WELCOME TO',
                class: 'intro'
            },
            title: {
                html: `Mobile Application`,
                class: 'title'
            },
            options: {
                html: `
                    <ion-button data-tag="menu">
                        <ion-icon slot="icon-only" name="ellipsis-vertical"></ion-icon>
                    </ion-button>`,
                slot: 'end'
            }
        },
        content: {
            intro: {
                html: `<ion-label class="intro ion-padding">Stay in touch with Us!</ion-label>`,
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
                html: `
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
                _saveElement: true,
                html: 'Login <ion-icon slot="end" name="log-in"></ion-icon>'
            },
            register: {
                text: `I don't have an account yet!`,
                href: '/register'
            }
        }
    })

    async handleMenuClick(model, target, event) {
        const popover = this.createElement('ion-popover', {
            component: 'login-popover',
            event,
            translucent: true
        });
        document.body.appendChild(popover);
        return popover.present();
    }

    async handleLoginClick(event) {
        event.stopImmediatePropagation();

        const loading = this.createElement('ion-loading', {
            message: 'Please wait...',
            duration: 1500
        });

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

    constructor(element, history) {
        super(element, history);

        this.setModel(this.initializeModel());

        // One simple way for targeting events using data-tag mechanism
        this.onTagClick('menu', this.handleMenuClick.bind(this));

        // For a more complex example take a look at "async onReady" function
    }

    async onReady() {
        // this method is called when this.element is mounted correctly (hydrated)

        // If you need to have access to DOM Element you can use { _saveElement: true } as a prop in model
        const loginButtonElement = this.model.footer.login.getElement();
        loginButtonElement.addEventListener('click', this.handleLoginClick.bind(this));

        // You can use also native methods, like querySelector
        const viewElement = this.element.querySelector('#view-password');
        if ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) {
            viewElement.addEventListener('touchstart', this.togglePassword.bind(this));
            // this.onTagEvent('touchstart', ...)
        } else {
            viewElement.addEventListener('mousedown', this.showPassword.bind(this));
            viewElement.addEventListener('mouseup', this.hidePassword.bind(this));
            // this.onTagEvent('mousedown', ...)
            // this.onTagEvent('mouseup', ...)
        }
    }
}

export default LoginController;
