function handleLiveMode() {
    localStorage.setItem('live-mode', 'active');
    handleRoot();
}

function handleGoBack() {
    history.back();
}

function handleRoot() {
    const root = document.querySelector('c-app-root') || document.createElement('c-app-root');
    const isLive = localStorage.getItem('live-mode') === 'active';

    if (isLive) {
        root.innerHTML = `<c-app-container></c-app-container>`
    } else {
        root.innerHTML = `
            <c-app-menu>
                <ion-button slot="before" expand="full" color="light" onclick="handleGoBack()">
                    <ion-icon name="arrow-back"></ion-icon> Go back
                </ion-button>
                <ion-button slot="after" expand="full" onclick="handleLiveMode()">Live mode</ion-button>
            </c-app-menu>
            <c-app-container>
                <div class="demo-device">
                    <figure>
                        <c-app-router></c-app-router>
                    </figure>
                </div>
            </c-app-container>
        `;
    }

    if (!root.isConnected) {
        document.body.appendChild(root);
    }
}

window.handleRoot = handleRoot;

window.addEventListener('load', handleRoot);