window.onload = () => {
    const root = document.querySelector('webc-app-root')
    root && root.componentOnReady().then(applicationMounted)
}

async function applicationMounted(root) {
    const appMenu = root.querySelector('#app-menu')
    const appMenuToggle = root.querySelector('#app-menu-toggle')
    if (!appMenu || !appMenuToggle) return

    appMenuToggle.addEventListener('click', e => {
        e.preventDefault();
        appMenu.show();
    })

    appMenu.querySelectorAll('webc-app-menu-item').forEach(item => {
        item.addEventListener('click', () => appMenu.hide())
    })
}