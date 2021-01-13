function handleLiveMode() {
    localStorage.setItem('live-mode', 'active');
    handleRoot();
}

function handleGoBack() {
    history.back();
}

function handleRoot() {
    const root = document.querySelector('wcc-app-root') || document.createElement('wcc-app-root');
    const isLive = localStorage.getItem('live-mode') === 'active';

    if (isLive) {
        root.innerHTML = `<wcc-app-container></wcc-app-container>`
    } else {
        root.innerHTML = `
            <wcc-app-menu>
                <ion-button slot="before" expand="full" color="light" onclick="handleGoBack()">
                    <ion-icon name="arrow-back"></ion-icon> Go back
                </ion-button>
                <ion-button slot="after" expand="full" onclick="handleLiveMode()">Live mode</ion-button>
            </wcc-app-menu>
            <wcc-app-container>
                <div class="demo-device">
                    <figure>
                        <wcc-app-router></wcc-app-router>
                    </figure>
                </div>
            </wcc-app-container>
        `;
    }

    if (!root.isConnected) {
        document.body.innerHTML = '';
        document.body.appendChild(root);
    }
}

window.handleRoot = handleRoot;

window.addEventListener('load', handleRoot);