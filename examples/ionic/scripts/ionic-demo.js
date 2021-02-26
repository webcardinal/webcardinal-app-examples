function handleLiveMode() {
    localStorage.setItem('live-mode', 'active');
    handleRoot();
}

function handleGoBack() {
    history.back();
}

function handleRoot() {
    const root = document.querySelector('webc-app-root') || document.createElement('webc-app-root');
    root.setAttribute('layout', 'vertical');
    const isLive = localStorage.getItem('live-mode') === 'active';

    if (isLive) {
        root.innerHTML = `<webc-app-container></webc-app-container>`
    } else {
        root.innerHTML = `
            <webc-app-menu>
                <ion-button slot="before" expand="full" color="light" onclick="handleGoBack()">
                    <ion-icon name="arrow-back"></ion-icon> Go back
                </ion-button>
                <ion-button slot="after" expand="full" onclick="handleLiveMode()">Live mode</ion-button>
            </webc-app-menu>
            <webc-app-container>
                <div class="demo-device">
                    <figure>
                        <webc-app-router></webc-app-router>
                    </figure>
                </div>
            </webc-app-container>
        `;
    }

    if (!root.isConnected) {
        document.body.innerHTML = '';
        document.body.appendChild(root);
    }
}

window.handleRoot = handleRoot;

window.addEventListener('load', handleRoot);